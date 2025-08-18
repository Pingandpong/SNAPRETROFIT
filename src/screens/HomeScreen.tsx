import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, VStack } from '@gluestack-ui/themed';
import { FlatList } from 'react-native';
import ScreenCard from '../components/ScreenCard';
import HeroBanner from '../components/HeroBanner';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = (_: HomeScreenProps) => {
  const { t } = useTranslation();

  const menuItems = [
    { icon: 'list' as const, title: t('list_card_title'), navigateTo: 'List' as const },
    { icon: 'credit-card' as const, title: t('payment_card_title'), navigateTo: 'Payment' as const },
    { icon: 'settings' as const, title: t('settings_title'), navigateTo: 'Settings' as const },
    { icon: 'user' as const, title: t('profile_card_title'), navigateTo: 'Profile' as const },
    { icon: 'edit' as const, title: t('create_edit_card_title'), navigateTo: 'CreateEdit' as const },
  ];

  return (
    <Box className="flex-1 bg-backgroundLight dark:bg-backgroundDark">
      <VStack className="flex-1 p-6 space-y-6">
        <HeroBanner />
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.navigateTo}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
          renderItem={({ item }) => (
            <ScreenCard
              icon={item.icon}
              title={item.title}
              navigateTo={item.navigateTo}
              className="mx-1"
            />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </VStack>
    </Box>
  );
};

export default HomeScreen;
