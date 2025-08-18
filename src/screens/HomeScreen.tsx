import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Heading, VStack } from '@gluestack-ui/themed';
import ScreenCard from '../components/ScreenCard';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();

  return (
    <Box className="flex-1 bg-backgroundLight dark:bg-backgroundDark">
      <VStack className="flex-1 p-6 space-y-6">
        <Heading size="xl" className="text-textLight dark:text-textDark">
          {t('home_title')}
        </Heading>

        <Box className="p-4 rounded-2xl bg-cardLight dark:bg-cardDark shadow-soft-2 dark:shadow-neumo-dark">
          <VStack className="space-y-4">
            <ScreenCard icon="list" title={t('list_card_title')} navigateTo="List" />
            <ScreenCard icon="credit-card" title={t('payment_card_title')} navigateTo="Payment" />
            <ScreenCard icon="settings" title={t('settings_title')} navigateTo="Settings" />
            <ScreenCard icon="user" title={t('profile_card_title')} navigateTo="Profile" />
            <ScreenCard icon="edit" title={t('create_edit_card_title')} navigateTo="CreateEdit" />
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default HomeScreen;