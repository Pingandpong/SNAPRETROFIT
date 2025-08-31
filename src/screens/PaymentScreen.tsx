import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Feather} from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { commonStyles } from '../styles/commonStyles';

import { useTranslation } from 'react-i18next';
import { useAppToast } from '../providers/ToastProvider';

type PaymentScreenProps = NativeStackScreenProps<RootStackParamList, 'Payment'>;

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.featureItem}>
    <Feather name="check" size={16} color="#4ade80" />
    <Text style={styles.featureText}>{children}</Text>
  </View>
);

const useCountUp = (value: number, duration = 500) => {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const startTs = useRef<number | null>(null);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    let raf = 0;
    startTs.current = null;
    const step = (ts: number) => {
      if (startTs.current == null) startTs.current = ts;
      const p = Math.min(1, (ts - startTs.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(from + (to - from) * eased);
      setDisplay(current);
      if (p < 1) raf = requestAnimationFrame(step);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return display;
};

const PaymentScreen = ({ navigation }: PaymentScreenProps) => {
  const { t } = useTranslation();
  const toast = useAppToast();
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<null | 'basic' | 'premium'>(null);

  const prices = useMemo(() => ({
    monthly: { basic: 5000, premium: 10000 },
    yearly: { basic: Math.round(5000 * 12 * 0.9), premium: Math.round(10000 * 12 * 0.85) },
  }), []);

  const basicTarget = prices[billing].basic;
  const premiumTarget = prices[billing].premium;
  const basicDisplay = useCountUp(basicTarget);
  const premiumDisplay = useCountUp(premiumTarget);

  const handleSelect = (plan: 'basic' | 'premium') => {
    setSelectedPlan(plan);
    const planName = plan === 'basic' ? t('basic_plan_title') : t('premium_plan_title');
    const cycle = billing === 'monthly' ? t('per_month') : t('per_year');
    toast({ title: `${planName} ${t('selected')}` , description: cycle });
  };
  return (
    <LinearGradient
      colors={['#0b0e23', '#151929']}
      style={commonStyles.container}>
      <SafeAreaView style={commonStyles.safe}>
        <View style={commonStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={commonStyles.backButton}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={commonStyles.headerTitle}>{t('payment_screen_title')}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Billing cycle toggle */}
          <View style={styles.toggleWrap}>
            <TouchableOpacity
              onPress={() => setBilling('monthly')}
              style={[styles.toggleBtn, billing === 'monthly' ? styles.toggleBtnActive : styles.toggleBtnInactive]}
            >
              <Text style={[styles.toggleText, billing === 'monthly' ? styles.toggleTextActive : styles.toggleTextInactive]}>
                {t('billing_monthly')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBilling('yearly')}
              style={[styles.toggleBtn, billing === 'yearly' ? styles.toggleBtnActive : styles.toggleBtnInactive]}
            >
              <Text style={[styles.toggleText, billing === 'yearly' ? styles.toggleTextActive : styles.toggleTextInactive]}>
                {t('billing_yearly')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.introContainer}>
            <Text style={styles.introTitle}>{t('payment_intro_title')}</Text>
            <Text style={styles.introText}>{t('payment_intro_message')}</Text>
          </View>

          <TouchableOpacity activeOpacity={0.9} onPress={() => handleSelect('basic')} style={[styles.planCard, selectedPlan === 'basic' && styles.planCardSelected]} accessibilityState={{ selected: selectedPlan === 'basic' }}>
            <Text style={styles.planTitle}>{t('basic_plan_title')}</Text>
            <Text style={styles.planPrice}>
              {`$${basicDisplay.toLocaleString()}${billing === 'monthly' ? ` ${t('per_month')}` : ` ${t('per_year')}`}`}
            </Text>
            <View style={styles.featuresContainer}>
              <FeatureItem>{t('basic_plan_feature1')}</FeatureItem>
              <FeatureItem>{t('basic_plan_feature2')}</FeatureItem>
            </View>
            <TouchableOpacity style={[styles.buttonOutline, selectedPlan === 'basic' && styles.buttonOutlineDisabled]} disabled={selectedPlan === 'basic'} onPress={() => handleSelect('basic')}>
              <Text style={[styles.buttonTextOutline, selectedPlan === 'basic' && styles.buttonTextMuted]}>{selectedPlan === 'basic' ? t('selected') : t('basic_plan_button')}</Text>
            </TouchableOpacity>
            {selectedPlan === 'basic' ? (
              <View style={styles.checkBadge}><Feather name="check" size={14} color="#fff" /></View>
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} onPress={() => handleSelect('premium')} style={[styles.planCard, styles.premiumPlan, selectedPlan === 'premium' && styles.planCardSelected]} accessibilityState={{ selected: selectedPlan === 'premium' }}>
            <Text style={styles.planTitle}>{t('premium_plan_title')}</Text>
            <Text style={styles.planPrice}>
              {`$${premiumDisplay.toLocaleString()}${billing === 'monthly' ? ` ${t('per_month')}` : ` ${t('per_year')}`}`}
            </Text>
            <View style={styles.featuresContainer}>
              <FeatureItem>{t('premium_plan_feature1')}</FeatureItem>
              <FeatureItem>{t('premium_plan_feature2')}</FeatureItem>
              <FeatureItem>{t('premium_plan_feature3')}</FeatureItem>
            </View>
            <TouchableOpacity style={[styles.button, selectedPlan === 'premium' && styles.buttonDisabled]} disabled={selectedPlan === 'premium'} onPress={() => handleSelect('premium')}>
              <Text style={[styles.buttonText, selectedPlan === 'premium' && styles.buttonTextMuted]}>{selectedPlan === 'premium' ? t('selected') : t('premium_plan_button')}</Text>
            </TouchableOpacity>
            {selectedPlan === 'premium' ? (
              <View style={styles.checkBadge}><Feather name="check" size={14} color="#fff" /></View>
            ) : null}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
  content: {
    padding: 24,
  },
  introContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  toggleWrap: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 999,
    padding: 4,
    marginBottom: 16,
  },
  toggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    minWidth: 110,
    alignItems: 'center',
  },
  toggleBtnActive: { backgroundColor: '#7d5cff' },
  toggleBtnInactive: { backgroundColor: 'transparent' },
  toggleText: { fontWeight: '600' },
  toggleTextActive: { color: '#ffffff' },
  toggleTextInactive: { color: 'rgba(255,255,255,0.8)' },
  introTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  introText: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  planCard: {
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  planCardSelected: {
    borderWidth: 2,
    borderColor: '#22c55e',
    shadowColor: '#22c55e',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
  },
  premiumPlan: {
    borderColor: '#7d5cff',
    borderWidth: 2,
  },
  planTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  planPrice: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    color: '#fff',
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#7d5cff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: 'rgba(125,92,255,0.6)',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonTextMuted: { color: 'rgba(255,255,255,0.8)' },
  buttonOutline: {
    borderColor: '#7d5cff',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonOutlineDisabled: {
    borderColor: 'rgba(125,92,255,0.6)'
  },
  buttonTextOutline: {
    color: '#7d5cff',
    fontWeight: 'bold',
  },
  checkBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
});

export default PaymentScreen;
