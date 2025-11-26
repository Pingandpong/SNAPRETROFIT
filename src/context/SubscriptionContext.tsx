import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { PlanType, SubscriptionData, PurchaseResult } from '../types/iap';
import { startPurchase, restorePurchase } from '../services/iap';
import { Platform } from 'react-native';
import { supabase } from '../services/supabase';

interface SubscriptionContextType {
    currentPlan: PlanType;
    subscriptionData: SubscriptionData | null;
    loading: boolean;
    buySubscription: (plan: Exclude<PlanType, 'free'>) => Promise<PurchaseResult>;
    restore: () => Promise<PurchaseResult>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [currentPlan, setCurrentPlan] = useState<PlanType>('free');
    const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            checkSubscriptionStatus(user.id);
        } else {
            setCurrentPlan('free');
            setSubscriptionData(null);
        }
    }, [user]);

    const checkSubscriptionStatus = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', userId)
                .eq('status', 'active')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (data) {
                setCurrentPlan(data.plan_type as PlanType);
                // Map Supabase data to SubscriptionData if needed, or just keep plan type
                // For now, we just set the plan.
            }
        } catch (error) {
            console.error('Error checking subscription:', error);
        }
    };

    const buySubscription = async (plan: Exclude<PlanType, 'free'>): Promise<PurchaseResult> => {
        if (!user) return { valid: false, error: 'User not logged in' };
        setLoading(true);
        try {
            const result = await startPurchase(plan, user.id);
            if (result.valid && result.data) {
                setSubscriptionData(result.data);
                setCurrentPlan(result.data.plan);
            }
            return result;
        } finally {
            setLoading(false);
        }
    };

    const restore = async (): Promise<PurchaseResult> => {
        if (!user) return { valid: false, error: 'User not logged in' };
        setLoading(true);
        try {
            // We pass user.id as the identifier for now, as our simplified restore logic uses it to look up DB.
            // In a real app, we might need to find the transaction ID first.
            const result = await restorePurchase(user.id, Platform.OS === 'ios' ? 'ios' : 'android', user.id);

            if (result.valid && result.data) {
                setSubscriptionData(result.data);
                setCurrentPlan(result.data.plan);
            }
            return result;
        } finally {
            setLoading(false);
        }
    };

    return (
        <SubscriptionContext.Provider value={{ currentPlan, subscriptionData, loading, buySubscription, restore }}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (context === undefined) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
};
