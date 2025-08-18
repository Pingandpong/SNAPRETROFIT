import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Heading, VStack, HStack } from '@gluestack-ui/themed';
import AppCard from '../components/AppCard';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/types';
import { Image } from 'react-native';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();

  return (
    <Box className="flex-1 bg-backgroundLight dark:bg-backgroundDark">
      <VStack className="flex-1 p-6 space-y-6">
        {/* Hero Image */}
        <Image
          source={require('../../sample_image/sample_IMAGE1.png')}
          className="w-full h-40 rounded-xl"
          resizeMode="cover"
        />
        <Heading size="xl" className="text-textLight dark:text-textDark">
          {t('home_title')}
        </Heading>

        {/* App Cards Grid */}
        <HStack className="flex-wrap justify-between">
          <AppCard
            title={t('list_card_title')}
            description={t('list_card_description')}
            navigateTo="List"
            image={require('../../sample_image/sample_IMAGE2.png')}
            className="w-[48%] mb-4"
          />
          <AppCard
            title={t('payment_card_title')}
            description={t('payment_card_description')}
            navigateTo="Payment"
            image={require('../../sample_image/sample_IMAGE3.png')}
            className="w-[48%] mb-4"
          />
          <AppCard
            title={t('card2_title')}
            description={t('card2_description')}
            navigateTo="Settings"
            image={require('../../sample_image/sample_IMAGE4.png')}
            className="w-[48%] mb-4"
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default HomeScreen;