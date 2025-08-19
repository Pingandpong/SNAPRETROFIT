import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { VStack, useToken } from '@gluestack-ui/themed';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenCard from '../components/ScreenCard';
import HeroBanner from '../components/HeroBanner';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = (_: HomeScreenProps) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      icon: 'list' as const,
      title: t('list_card_title'),
      subtitle: t('list_card_description'),
      navigateTo: 'List' as const,
    },
    {
      icon: 'credit-card' as const,
      title: t('payment_card_title'),
      subtitle: t('payment_card_description'),
      navigateTo: 'Payment' as const,
    },
    {
      icon: 'settings' as const,
      title: t('settings_title'),
      subtitle: t('settings_card_description'),
      navigateTo: 'Settings' as const,
    },
    {
      icon: 'user' as const,
      title: t('profile_card_title'),
      subtitle: t('profile_card_description'),
      navigateTo: 'Profile' as const,
    },
    {
      icon: 'edit' as const,
      title: t('create_edit_card_title'),
      subtitle: t('create_edit_card_description'),
      navigateTo: 'CreateEdit' as const,
    },
  ];

  const [bgStart, bgEnd] = useToken('colors', ['homeBgStart', 'homeBgEnd']);

  return (
    <LinearGradient
      colors={[bgStart, bgEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
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
              subtitle={item.subtitle}
              navigateTo={item.navigateTo}
              className="mx-1"
            />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </VStack>
    </LinearGradient>
  );
};

export default HomeScreen;
