import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonStyles } from '../styles/commonStyles';
import AppButton from '../components/AppButton';
import { useAppToast } from '../providers/ToastProvider';
import AppHeader from '../components/AppHeader';

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

  return (
    <LinearGradient
      colors={['#0b0e23', '#151929']}
      style={commonStyles.container}>
      <SafeAreaView style={commonStyles.safe}>
        <AppHeader
          title={t('settings_title')}
          showBackButton
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.content}>
          <View style={styles.settingGroup}>
            <Text style={styles.settingTitle}>{t('language_setting_title')}</Text>
            <View style={styles.languageButtonsContainer}>
              <LanguageButton lang="ko" langKey="change_to_korean" />
              <LanguageButton lang="en" langKey="change_to_english" />
            </View>
            <View style={styles.languageButtonsContainer}>
              <LanguageButton lang="ja" langKey="change_to_japanese" />
              <LanguageButton lang="es" langKey="change_to_spanish" />
            </View>
          </View>

          <View style={styles.settingGroup}>
            <Text style={styles.settingTitle}>{t('theme_setting_title')}</Text>
            <View style={styles.themeSwitchContainer}>
              <Text style={styles.themeSwitchLabel}>{t('dark_mode_label')}</Text>
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
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
  content: {
    flex: 1,
    padding: 24,
  },
  settingGroup: {
    marginBottom: 32,
  },
  settingTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  languageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  themeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    padding: 16,
  },
  themeSwitchLabel: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SettingsScreen;