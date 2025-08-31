import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';


import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from '../components/AppButton';
import { useAppToast } from '../providers/ToastProvider';
import AppHeader from '../components/AppHeader';
import AppScreen from '../components/AppScreen';
import SectionHeader from '../components/SectionHeader';
import FormField from '../components/FormField';
import { appTheme } from '../theme/gluestack-ui.theme';

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { t, i18n } = useTranslation();
  const { colorMode, toggleColorMode } = useTheme();
  const showToast = useAppToast();

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      await AsyncStorage.setItem('language', lng);
      showToast({ title: t('language_changed') });
    } catch (error) {
      console.error("Failed to save language to storage", error);
    }
  };

  const LanguageButton = ({ lang, langKey }: { lang: string; langKey: string }) => {
    const isActive = i18n.language.startsWith(lang);
    return (
      <AppButton
        title={t(langKey)}
        variant={isActive ? 'primary' : 'outline'}
        onPress={() => changeLanguage(lang)}
        accessibilityLabel={t(langKey)}
        accessibilityRole="button"
        className="flex-1 mx-2"
      />
    );
  };

  const textColor =
    colorMode === 'dark'
      ? appTheme.tokens.colors.textDark
      : appTheme.tokens.colors.textLight;

  return (
    <AppScreen>
      <AppHeader
        title={t('settings_title')}
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <SectionHeader title={t('language_setting_title')} />
      <View style={styles.languageButtonsContainer}>
        <LanguageButton lang="ko" langKey="change_to_korean" />
        <LanguageButton lang="en" langKey="change_to_english" />
      </View>
      <View style={styles.languageButtonsContainer}>
        <LanguageButton lang="ja" langKey="change_to_japanese" />
        <LanguageButton lang="es" langKey="change_to_spanish" />
      </View>

      <SectionHeader title={t('theme_setting_title')} />
      <FormField>
        <View style={styles.themeSwitchContainer}>
          <Text style={[styles.themeSwitchLabel, { color: textColor }]}>{t('dark_mode_label')}</Text>
          <Switch
            value={colorMode === 'dark'}
            onValueChange={toggleColorMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={colorMode === 'dark' ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            accessibilityLabel={t('dark_mode_toggle')}
            accessibilityRole="switch"
          />
        </View>
      </FormField>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  languageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  themeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  themeSwitchLabel: {
    fontSize: 16,
  },
});

export default SettingsScreen;
