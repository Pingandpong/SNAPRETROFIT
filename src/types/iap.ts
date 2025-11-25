export type PlanType = 'basic' | 'premium' | 'free';

export interface SubscriptionData {
    productId: string;
    plan: PlanType;
    limit: number;
    remainingUses: number;
    purchaseDate: string;
    platform: 'android' | 'ios';
    lastResetDate: string;
    purchaseToken?: string;
    transactionIdentifierIOS?: string;
    obfuscatedAccountIdAndroid?: string;
}

export interface PurchaseResult {
    valid: boolean;
    data?: SubscriptionData;
    error?: string;
}

export const isValidPlan = (plan: string): plan is PlanType => {
    return ['basic', 'premium', 'free'].includes(plan);
};
