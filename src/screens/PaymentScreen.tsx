import React from 'react';
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

type PaymentScreenProps = NativeStackScreenProps<RootStackParamList, 'Payment'>;

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.featureItem}>
    <Feather name="check" size={16} color="#4ade80" />
    <Text style={styles.featureText}>{children}</Text>
  </View>
);

const PaymentScreen = ({ navigation }: PaymentScreenProps) => {
  const { t } = useTranslation();
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
          <View style={styles.introContainer}>
            <Text style={styles.introTitle}>{t('payment_intro_title')}</Text>
            <Text style={styles.introText}>{t('payment_intro_message')}</Text>
          </View>

          <View style={styles.planCard}>
            <Text style={styles.planTitle}>{t('basic_plan_title')}</Text>
            <Text style={styles.planPrice}>{t('basic_plan_price')}</Text>
            <View style={styles.featuresContainer}>
              <FeatureItem>{t('basic_plan_feature1')}</FeatureItem>
              <FeatureItem>{t('basic_plan_feature2')}</FeatureItem>
            </View>
            <TouchableOpacity style={styles.buttonOutline}>
              <Text style={styles.buttonTextOutline}>{t('basic_plan_button')}</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.planCard, styles.premiumPlan]}>
            <Text style={styles.planTitle}>{t('premium_plan_title')}</Text>
            <Text style={styles.planPrice}>{t('premium_plan_price')}</Text>
            <View style={styles.featuresContainer}>
              <FeatureItem>{t('premium_plan_feature1')}</FeatureItem>
              <FeatureItem>{t('premium_plan_feature2')}</FeatureItem>
              <FeatureItem>{t('premium_plan_feature3')}</FeatureItem>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{t('premium_plan_button')}</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonOutline: {
    borderColor: '#7d5cff',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonTextOutline: {
    color: '#7d5cff',
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
