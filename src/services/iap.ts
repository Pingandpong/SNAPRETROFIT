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
import { supabase } from './supabase';
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
    userId: string,
): Promise<PurchaseResult> => {
    if (!userId) {
        Alert.alert(i18next.t('error', 'Error'), i18next.t('user_auth_required', 'User information is required.'));
        return { valid: false, error: 'User ID is required' };
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
                    obfuscatedAccountIdAndroid: userId,
                }
            }
        });

        if (!purchaseResult) throw new Error('No purchase data returned');

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

        // Save to Supabase
        const { error } = await supabase
            .from('subscriptions')
            .insert({
                user_id: userId,
                plan_type: purchasedPlan,
                status: 'active',
                start_date: new Date().toISOString(),
            });

        if (error) {
            console.error('Error saving subscription to Supabase:', error);
            // We don't block the UI success but we should probably retry or alert
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
    userId: string
): Promise<PurchaseResult> => {
    // Simplified restore for now - just checks if there's an active subscription in Supabase
    // In a real app, you'd validate with the store receipt
    try {
        const { data, error } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error || !data) {
            Alert.alert(i18next.t('notification', 'Notification'), i18next.t('no_purchases_found', 'No active subscription found.'));
            return { valid: false, error: 'No active subscription found' };
        }

        const plan = data.plan_type as PlanType;
        const initialLimit = usageLimits[plan] || usageLimits.basic;

        const resultData: SubscriptionData = {
            productId: platform === 'ios' ? iosProductIds[plan as Exclude<PlanType, 'free'>] : androidProductId,
            plan: plan,
            limit: initialLimit,
            remainingUses: initialLimit, // This should come from usage tracking table
            purchaseDate: data.start_date,
            platform: platform,
            lastResetDate: new Date().toISOString(),
        };

        Alert.alert(i18next.t('success', 'Success'), i18next.t('restore_completed', 'Subscription restored successfully.'));
        return { valid: true, data: resultData };

    } catch (error: any) {
        console.error('❌ Restore Error:', error);
        Alert.alert(i18next.t('error', 'Error'), error.message || 'Restore failed');
        return { valid: false, error: error.message };
    }
};
