import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Text as GluestackText, Button, ButtonIcon, ArrowLeftIcon, Heading, HStack, VStack } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
  Settings: undefined;
};

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { t, i18n } = useTranslation();

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
    <Box flex={1}>
      <Box
        flexDirection="row"
        alignItems="center"
        px="$4"
        py="$3"
        bg="$backgroundLight0"
        borderBottomWidth="$1"
        borderBottomColor="$borderLight200"
      >
        <Button variant="link" onPress={() => navigation.goBack()} p="$0">
          <ButtonIcon as={ArrowLeftIcon} size="xl" color="$textLight900" />
        </Button>
        <GluestackText fontSize="$xl" fontWeight="$bold" color="$textLight900" ml="$3">
          {t('settings_title')}
        </GluestackText>
      </Box>
      <Box flex={1} p="$5">
        <VStack space="lg">
          <Heading>{t('language_setting_title')}</Heading>
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
      </Box>
    </Box>
  );
};

export default SettingsScreen;
