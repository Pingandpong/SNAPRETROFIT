import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Text as GluestackText, Button, ButtonIcon, ArrowLeftIcon, Heading, HStack, VStack, Switch, Text } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { t, i18n } = useTranslation();
  const { colorMode, toggleColorMode } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const LanguageButton = ({ lang, langKey }: { lang: string, langKey: string }) => (
    <Button 
      onPress={() => changeLanguage(lang)}
      flex={1}
      variant={i18n.language === lang ? 'solid' : 'outline'}
    >
      <GluestackText>{t(langKey)}</GluestackText>
    </Button>
  );

  return (
    <Box flex={1} bg={colorMode === 'dark' ? '$backgroundDark' : '$backgroundLight'}>
      <Box
        flexDirection="row"
        alignItems="center"
        px="$4"
        py="$3"
        borderBottomWidth="$1"
        bg={colorMode === 'dark' ? '$backgroundDark' : '$backgroundLight'} 
        borderBottomColor={colorMode === 'dark' ? '$borderDark' : '$borderLight'}
      >
        <Button variant="link" onPress={() => navigation.goBack()} p="$0">
          <ButtonIcon as={ArrowLeftIcon} size="xl" color={colorMode === 'dark' ? '$textDark' : '$textLight'} />
        </Button>
        <GluestackText fontSize="$xl" fontWeight="$bold" color={colorMode === 'dark' ? '$textDark' : '$textLight'} ml="$3">
          {t('settings_title')}
        </GluestackText>
      </Box>
      <Box flex={1} p="$5">
        <VStack space="xl">
          {/* Language Settings */}
          <VStack space="lg">
            <Heading color={colorMode === 'dark' ? '$textDark' : '$textLight'}>{t('language_setting_title')}</Heading>
            <VStack space="md">
              <HStack space="md">
                <LanguageButton lang="ko" langKey="change_to_korean" />
                <LanguageButton lang="en" langKey="change_to_english" />
              </HStack>
              <HStack space="md">
                <LanguageButton lang="ja" langKey="change_to_japanese" />
                <LanguageButton lang="es" langKey="change_to_spanish" />
              </HStack>
            </VStack>
          </VStack>

          {/* Theme Settings */}
          <VStack space="lg">
            <Heading color={colorMode === 'dark' ? '$textDark' : '$textLight'}>{t('theme_setting_title')}</Heading>
            <HStack space="md" alignItems="center" justifyContent="space-between">
              <Text size="lg" color={colorMode === 'dark' ? '$textDark' : '$textLight'}>{t('dark_mode_label')}</Text>
              <Switch
                value={colorMode === 'dark'}
                onValueChange={toggleColorMode}
              />
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default SettingsScreen;
