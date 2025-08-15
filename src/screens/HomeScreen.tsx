import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Text as GluestackText } from '@gluestack-ui/themed';
import AppCard from '../components/AppCard';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const { colorMode } = useTheme(); // Call hook at the top level

  return (
    <Box flex={1} bg={colorMode === 'dark' ? '$backgroundDark' : '$backgroundLight'}>
      <Box flex={1} justifyContent="flex-start" alignItems="center" paddingTop={20}>
        <Box flexDirection="row" alignItems="center" marginBottom={20} w="$full" mx="auto" justifyContent="flex-start" px="$4">
          {/* Use the variable from the hook */}
          <MaterialCommunityIcons name="home" size={28} color={colorMode === 'dark' ? 'white' : 'black'} />
          <GluestackText fontSize="$xl" fontWeight="$bold" marginLeft={10} color={colorMode === 'dark' ? '$textDark' : '$textLight'}>{t('home_title')}</GluestackText>
        </Box>

        {/* Gluestack UI Test Component */}
        <Box
          bg="$blue500"
          p="$5"
          borderRadius="$md"
          mb="$5"
          width="$full"
          mx="auto"
          alignItems="center"
        >
          <GluestackText color="$white" fontSize="$lg" fontWeight="$bold">
            Gluestack UI Test!
          </GluestackText>
        </Box>

        <Box w="$full" mx="auto" marginBottom={30} padding={16} borderRadius={12} bg="$primary500">
          <GluestackText color="$white" fontSize="$2xl" fontWeight="$bold" marginBottom={8}>{t('welcome')}</GluestackText>
          <GluestackText color="$white" fontSize="$md" lineHeight={24}>{t('welcome_message')}</GluestackText>
        </Box>

        {/* React Native Paper의 Card 컴포넌트 사용 예시 */}
        <AppCard
          title={t('card1_title')}
          description={t('card1_description')}
          navigateTo="Detail"
          buttonText={t('card1_button')}
        />

        <AppCard
          title={t('card2_title')}
          description={t('card2_description')}
          navigateTo="Settings"
          buttonText={t('card2_button')}
        />

        <AppCard
          title={t('payment_card_title')}
          description={t('payment_card_description')}
          navigateTo="Payment"
          buttonText={t('payment_card_button')}
        />

        <AppCard
          title={t('list_card_title')}
          description={t('list_card_description')}
          navigateTo="List"
          buttonText={t('list_card_button')}
        />
      </Box>
    </Box>
  );
};

export default HomeScreen;

