import React from 'react';
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, Heading } from '@gluestack-ui/themed';
import { appTheme } from '../theme/gluestack-ui.theme';
import { useTranslation } from 'react-i18next';

const Screen2 = () => {
  const { t } = useTranslation();
  const start = appTheme.tokens.colors.homeBgStart;
  const end = appTheme.tokens.colors.homeBgEnd;

  return (
    <LinearGradient colors={[start, end]} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Box>
          <Heading size="lg" style={{color: 'white', textAlign: 'center'}}>
            {t('screen2_title') || 'Screen 2'}
          </Heading>
        </Box>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Screen2;