import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Button, ButtonText, Heading, HStack, VStack, Switch, Text, Pressable } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { t, i18n } = useTranslation();
  const { colorMode, toggleColorMode } = useTheme();

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      await AsyncStorage.setItem('language', lng);
    } catch (error) {
      console.error("Failed to save language to storage", error);
    }
  };

  const LanguageButton = ({ lang, langKey }: { lang: string; langKey: string }) => {
    const isActive = i18n.language.startsWith(lang);
    return (
      <Button
        onPress={() => changeLanguage(lang)}
        flex={1}
        variant={isActive ? 'solid' : 'outline'}
        action={isActive ? 'primary' : 'secondary'}
        size="lg"
      >
        <ButtonText>{t(langKey)}</ButtonText>
      </Button>
    );
  };

  return (
    <Box className="flex-1 bg-backgroundLight dark:bg-backgroundDark justify-center">
      {/* Header */}
      <HStack className="items-center p-4 pt-8 justify-between bg-cardLight dark:bg-cardDark rounded-b-xl shadow-soft-2">
        <Pressable onPress={() => navigation.goBack()} className="mr-4">
          <Feather name="arrow-left" size={24} className="text-textLight dark:text-textDark text-shadow-neumo-icon" />
        </Pressable>
        <Heading size="lg" className="text-textLight dark:text-textDark">
          {t('settings_title')}
        </Heading>
      </HStack>

      {/* Content */}
      <VStack className="flex-1 p-6 space-y-8">
        {/* Language Settings */}
        <VStack className="space-y-4">
          <Heading size="md" className="text-textLight dark:text-textDark">
            {t('language_setting_title')}
          </Heading>
          <HStack className="space-x-4">
            <LanguageButton lang="ko" langKey="change_to_korean" />
            <LanguageButton lang="en" langKey="change_to_english" />
          </HStack>
          <HStack className="space-x-4">
            <LanguageButton lang="ja" langKey="change_to_japanese" />
            <LanguageButton lang="es" langKey="change_to_spanish" />
          </HStack>
        </VStack>

        {/* Theme Settings */}
        <VStack className="space-y-4">
          <Heading size="md" className="text-textLight dark:text-textDark">
            {t('theme_setting_title')}
          </Heading>
          <HStack className="items-center justify-between rounded-xl p-4 space-x-4 bg-cardLight dark:bg-cardDark shadow-md">
            <Text size="lg" className="text-textLight dark:text-textDark">
              {t('dark_mode_label')}
            </Text>
            <Switch
              value={colorMode === 'dark'}
              onValueChange={toggleColorMode}
              size="lg"
            />
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SettingsScreen;