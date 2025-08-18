import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Heading, VStack, HStack } from '@gluestack-ui/themed';
import AppCard from '../components/AppCard';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();

  return (
    <Box className="flex-1 bg-backgroundLight dark:bg-backgroundDark">
      <VStack className="flex-1 p-6 space-y-6">
        {/* Hero 영역 */}
        <Box className="w-full h-40 rounded-xl bg-primary500" />
        <Heading size="xl" className="text-textLight dark:text-textDark">
          {t('home_title')}
        </Heading>

        {/* App Cards Grid */}
        <HStack className="flex-wrap justify-between">
          <AppCard
            title={t('list_card_title')}
            description={t('list_card_description')}
            navigateTo="List"
            className="w-[48%] mb-4"
          />
          <AppCard
            title={t('payment_card_title')}
            description={t('payment_card_description')}
            navigateTo="Payment"
            className="w-[48%] mb-4"
          />
          <AppCard
            title={t('card2_title')}
            description={t('card2_description')}
            navigateTo="Settings"
            className="w-[48%] mb-4"
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default HomeScreen;