import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Heading, VStack, HStack } from '@gluestack-ui/themed';
import AppCard from '../components/AppCard';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/types';
import { Feather } from '@expo/vector-icons';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();

  return (
    <Box className="flex-1 bg-backgroundLight dark:bg-backgroundDark justify-center">
      <VStack className="flex-1 space-y-4 p-6">
        {/* Header */}
        <HStack className="items-center space-x-4 pt-8">
          <Feather name="trello" size={24} className="text-textLight dark:text-textDark text-shadow-neumo-icon" />
          <Heading size="xl" className="text-textLight dark:text-textDark">
            {t('home_title')}
          </Heading>
        </HStack>

        {/* App Cards */}
        <AppCard
          title={t('list_card_title')}
          description={t('list_card_description')}
          navigateTo="List"
          iconName="list"
        />
        <AppCard
          title={t('payment_card_title')}
          description={t('payment_card_description')}
          navigateTo="Payment"
          iconName="credit-card"
        />
        <AppCard
          title={t('card2_title')}
          description={t('card2_description')}
          navigateTo="Settings"
          iconName="settings"
        />
      </VStack>
    </Box>
  );
};

export default HomeScreen;