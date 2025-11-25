import {
    initConnection,
    endConnection,
    fetchProducts,
    requestPurchase,
    acknowledgePurchaseAndroid,
    finishTransaction,
    getAvailablePurchases,
    PurchaseError,
    Purchase
} from 'react-native-iap';
import { Alert, Platform } from 'react-native';
import { httpsCallable } from 'firebase/functions';
import { ref, set, update } from 'firebase/database';
import { auth, db, functions } from '../config/firebaseConfig';
import { PlanType, PurchaseResult, SubscriptionData, isValidPlan } from '../types/iap';
import i18next from 'i18next';

let isBillingConnected = false;

const iosProductIds: { [key in Exclude<PlanType, 'free'>]: string } = {
    basic: 'basic_plan', // TODO: Replace with actual ID
    premium: 'premium_plan', // TODO: Replace with actual ID
};

const androidProductId = 'datep_subscribe'; // TODO: Replace with actual ID

const usageLimits: { [key in PlanType]: number } = {
    free: 1,
    basic: 50,
    premium: 100,
};

const ensureBillingConnected = async (retries = 3, delay = 1000): Promise<boolean> => {
    if (isBillingConnected) {
        console.log('✅ BillingClient already connected.');
        return true;
    }

    console.log('📌 Connecting to BillingClient...');
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`    Attempt ${attempt}/${retries}...`);
            await initConnection();
            isBillingConnected = true;
            console.log('✅ BillingClient connected successfully');
            return true;
        } catch (error) {
            console.error(`❌ BillingClient connection error (Attempt ${attempt}/${retries}):`, error);
            if (attempt === retries) {
                Alert.alert(
                    i18next.t('error', 'Error'),
                    i18next.t('billing_connection_failed', 'Failed to connect to billing service. Please try again later.')
                );
                isBillingConnected = false;
                return false;
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    isBillingConnected = false;
    return false;
};

const endBillingConnection = async () => {
    if (isBillingConnected) {
        try {
            console.log('📌 Ending BillingClient connection...');
            await endConnection();
            isBillingConnected = false;
            console.log('✅ BillingClient connection ended');
        } catch (endError) {
            console.error('❌ Failed to end BillingClient connection:', JSON.stringify(endError, null, 2));
        }
    }
};

const getSubscriptionDetails = async (targetProductId: string) => {
    try {
        const skus = [targetProductId];
        console.log('📌 Fetching subscription details:', skus);
        const subscriptions = await fetchProducts({ skus, type: 'subs' });

        if (!subscriptions || subscriptions.length === 0) {
            console.warn(`⚠️ No subscription products found for SKU: ${targetProductId}`);
            throw new Error(`No subscription products found for SKU: ${targetProductId}`);
        }

        const subscription = subscriptions[0];
        let offerTokenToPlanMap: Record<string, PlanType> = {};
        let planToOfferTokenMap: Record<Exclude<PlanType, 'free'>, string | undefined> = { basic: undefined, premium: undefined };

        if (Platform.OS === 'android' && 'subscriptionOfferDetails' in subscription) {
            const offerDetails = (subscription as any).subscriptionOfferDetails;
            if (offerDetails && offerDetails.length > 0) {
                offerDetails.forEach((detail: any) => {
                    if (detail.offerToken && detail.basePlanId) {
                        const currentPlan: PlanType = detail.basePlanId.toLowerCase() === 'basic' ? 'basic' : detail.basePlanId.toLowerCase() === 'premium' ? 'premium' : 'free';
                        if (isValidPlan(currentPlan) && currentPlan !== 'free') {
                            offerTokenToPlanMap[detail.offerToken] = currentPlan;
                            planToOfferTokenMap[currentPlan as Exclude<PlanType, 'free'>] = detail.offerToken;
                        }
                    }
                });
            }
        }

        return { subscription, offerTokenToPlanMap, planToOfferTokenMap };
    } catch (error) {
        console.error(`❌ Error fetching subscription details (${Platform.OS}, SKU: ${targetProductId}):`, error);
        throw error;
    }
};

export const startPurchase = async (
    plan: Exclude<PlanType, 'free'>,
    firebaseUid: string,
): Promise<PurchaseResult> => {
    if (!firebaseUid) {
        Alert.alert(i18next.t('error', 'Error'), i18next.t('user_auth_required', 'User information is required.'));
        return { valid: false, error: 'Firebase UID is required' };
    }

    try {
        const connected = await ensureBillingConnected();
        if (!connected) {
            return { valid: false, error: 'Failed to initialize IAP connection' };
        }

        const targetProductId = Platform.OS === 'ios' ? iosProductIds[plan] : androidProductId;
        if (!targetProductId) {
            Alert.alert(i18next.t('error', 'Error'), i18next.t('product_not_found', 'Product information not found.'));
            return { valid: false, error: `Product ID not found for plan: ${plan}` };
        }

        const { planToOfferTokenMap } = await getSubscriptionDetails(targetProductId);
        const selectedOfferToken = Platform.OS === 'android' ? planToOfferTokenMap[plan] : undefined;

        if (Platform.OS === 'android' && !selectedOfferToken) {
            Alert.alert(i18next.t('error', 'Error'), i18next.t('product_config_error', 'Product configuration error.'));
            throw new Error(`No valid offerToken found for requested plan: ${plan}`);
        }

        const purchaseResult = await requestPurchase({
            type: 'subs',
            request: {
                ios: {
                    sku: targetProductId,
                },
                android: {
                    skus: [targetProductId],
                    ...(selectedOfferToken ? { subscriptionOffers: [{ sku: targetProductId, offerToken: selectedOfferToken }] } : {}),
                    obfuscatedAccountIdAndroid: firebaseUid,
                }
            }
        });

        if (!purchaseResult) throw new Error('No purchase data returned');

        // purchaseResult is a single Purchase object in v14 (based on IAP.instance.requestPurchase return type)
        // But let's handle array just in case, though types say it's single.
        const extendedPurchaseResult = Array.isArray(purchaseResult) ? purchaseResult[0] : purchaseResult;
        if (!extendedPurchaseResult) throw new Error('Invalid purchase data');

        const purchaseToken = Platform.OS === 'android' ? (extendedPurchaseResult as any).purchaseToken : undefined;
        const transactionId = Platform.OS === 'ios' ? (extendedPurchaseResult as any).transactionId : undefined;
        const originalTransactionIdentifierIOS = Platform.OS === 'ios'
            ? ((extendedPurchaseResult as any).originalTransactionIdentifierIOS || transactionId) : undefined;

        const purchaseDate = (extendedPurchaseResult as any).transactionDate
            ? new Date((extendedPurchaseResult as any).transactionDate).toISOString()
            : new Date().toISOString();

        const purchasedProductIdFromStore = (extendedPurchaseResult as any).productId || targetProductId;
        const obfuscatedAccountIdAndroid = Platform.OS === 'android' ? (extendedPurchaseResult as any).obfuscatedAccountIdAndroid : undefined;

        let purchasedPlan: PlanType = plan;

        if (Platform.OS === 'ios') {
            const planFromProductId = Object.keys(iosProductIds).find(
                (key) => iosProductIds[key as Exclude<PlanType, 'free'>] === purchasedProductIdFromStore
            ) as Exclude<PlanType, 'free'> | undefined;
            if (planFromProductId) purchasedPlan = planFromProductId;
        }

        const initialLimit = usageLimits[purchasedPlan] || usageLimits.basic;
        const firebaseSubscriptionKey = Platform.OS === 'android' ? (obfuscatedAccountIdAndroid || firebaseUid) : originalTransactionIdentifierIOS;

        const subscriptionData: SubscriptionData = {
            productId: purchasedProductIdFromStore,
            plan: purchasedPlan,
            limit: initialLimit,
            remainingUses: initialLimit,
            purchaseDate: purchaseDate,
            platform: Platform.OS as 'android' | 'ios',
            lastResetDate: new Date().toISOString(),
            ...(Platform.OS === 'android' && purchaseToken ? { purchaseToken } : {}),
            ...(Platform.OS === 'ios' && originalTransactionIdentifierIOS ? { transactionIdentifierIOS: originalTransactionIdentifierIOS } : {}),
            ...(Platform.OS === 'android' && obfuscatedAccountIdAndroid ? { obfuscatedAccountIdAndroid } : {}),
        };

        await set(ref(db, `subscriptions/${firebaseSubscriptionKey}`), subscriptionData);

        const userRef = ref(db, `users/${firebaseUid}`);
        if (Platform.OS === 'android' && obfuscatedAccountIdAndroid) {
            await update(userRef, { obfuscatedAccountIdAndroid });
        } else if (Platform.OS === 'ios' && originalTransactionIdentifierIOS) {
            await update(userRef, { iosSubscriptionKey: originalTransactionIdentifierIOS });
        }

        if (Platform.OS === 'android' && purchaseToken && !(extendedPurchaseResult as any).isAcknowledgedAndroid) {
            await acknowledgePurchaseAndroid(purchaseToken);
        } else if (Platform.OS === 'ios' && transactionId) {
            await finishTransaction({ transactionIdentifier: transactionId, isConsumable: false } as any);
        }

        Alert.alert(i18next.t('success', 'Success'), i18next.t('purchase_completed', 'Subscription completed.'));
        return { valid: true, data: subscriptionData };

    } catch (error: any) {
        console.error('❌ Purchase Error:', error);
        Alert.alert(i18next.t('error', 'Error'), error.message || 'Purchase failed');
        return { valid: false, error: error.message };
    } finally {
        await endBillingConnection();
    }
};

export const restorePurchase = async (
    subscriptionIdentifier: string,
    platform: 'android' | 'ios',
    firebaseUidFromProvider: string
): Promise<PurchaseResult> => {
    try {
        const currentUser = auth.currentUser;
        if (!currentUser) return { valid: false, error: 'User not authenticated' };

        const connected = await ensureBillingConnected();
        if (!connected) return { valid: false, error: 'Failed to connect to billing' };

        const purchases = await getAvailablePurchases();
        const purchase = purchases.find((p: any) =>
            platform === 'android'
                ? p.obfuscatedAccountIdAndroid === subscriptionIdentifier
                : p.originalTransactionIdentifierIOS === subscriptionIdentifier
        );

        if (!purchase) {
            Alert.alert(i18next.t('notification', 'Notification'), i18next.t('no_purchases_found', 'No purchases found to restore.'));
            return { valid: false, error: 'No purchases found' };
        }

        interface RestoreResponse {
            success: boolean;
            message: string;
            plan: 'free' | 'basic' | 'premium';
            remainingUses: number;
            limit: number;
            purchaseDate: string;
            platform: 'android' | 'ios';
            obfuscatedAccountIdAndroid?: string;
            transactionIdentifierIOS?: string;
        }

        const restorePurchaseHandlerCallable = httpsCallable<unknown, RestoreResponse>(functions, 'restorePurchase');
        const restoreRequestData = {
            purchaseToken: platform === 'android' ? (purchase as any).purchaseToken : null,
            obfuscatedAccountIdAndroid: platform === 'android' ? subscriptionIdentifier : null,
            transactionIdentifierIOS: platform === 'ios' ? subscriptionIdentifier : null,
            platform: platform,
        };

        const response = await restorePurchaseHandlerCallable(restoreRequestData);
        const responseData = response.data;

        if (!responseData.success) {
            Alert.alert(i18next.t('error', 'Error'), responseData.message);
            return { valid: false, error: responseData.message };
        }

        const resultData: SubscriptionData = {
            productId: purchase.productId,
            plan: responseData.plan,
            limit: responseData.limit,
            remainingUses: responseData.remainingUses,
            purchaseDate: responseData.purchaseDate,
            platform: platform,
            lastResetDate: new Date().toISOString(),
            ...(platform === 'android' && (purchase as any).purchaseToken && { purchaseToken: (purchase as any).purchaseToken }),
            ...(platform === 'ios' && responseData.transactionIdentifierIOS && { transactionIdentifierIOS: responseData.transactionIdentifierIOS }),
            ...(platform === 'android' && responseData.obfuscatedAccountIdAndroid && { obfuscatedAccountIdAndroid: responseData.obfuscatedAccountIdAndroid }),
        };

        const finalFirebaseKey = platform === 'android' ? (responseData.obfuscatedAccountIdAndroid || subscriptionIdentifier) : (responseData.transactionIdentifierIOS || subscriptionIdentifier);
        await set(ref(db, `subscriptions/${finalFirebaseKey}`), resultData);

        if (currentUser.uid) {
            const userRef = ref(db, `users/${currentUser.uid}`);
            if (platform === 'android' && finalFirebaseKey) {
                await update(userRef, { obfuscatedAccountIdAndroid: finalFirebaseKey });
            } else if (platform === 'ios' && finalFirebaseKey) {
                await update(userRef, { iosSubscriptionKey: finalFirebaseKey });
            }
        }

        Alert.alert(i18next.t('success', 'Success'), i18next.t('restore_completed', 'Subscription restored successfully.'));
        return { valid: true, data: resultData };

    } catch (error: any) {
        console.error('❌ Restore Error:', error);
        Alert.alert(i18next.t('error', 'Error'), error.message || 'Restore failed');
        return { valid: false, error: error.message };
    } finally {
        await endBillingConnection();
    }
};
