import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Heading, Text, VStack, useToken } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';

const HeroBanner = () => {
  const { t } = useTranslation();
  const [start, end] = useToken('colors', ['heroStart', 'heroEnd']);

  return (
    <LinearGradient
      colors={[start, end]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 24 }}
    >
      <VStack className="p-6 space-y-2">
        <Heading size="2xl" className="text-white font-poppins">
          {t('home_title')}
        </Heading>
        <Text className="text-white opacity-80 font-poppins">{t('welcome_message')}</Text>
      </VStack>
    </LinearGradient>
  );
};

export default HeroBanner;
