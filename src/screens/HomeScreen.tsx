import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Text as GluestackText, Button, ButtonText } from '@gluestack-ui/themed'; // Gluestack UI Button 추가
import AppCard from '../components/AppCard';

// 기존 react-native 및 react-native-paper 임포트 제거
// import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
// import { Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';



type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
  Settings: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <Box flex={1} bg="$backgroundLight0">
      <Box flex={1} justifyContent="flex-start" alignItems="center" paddingTop={20}>
        <Box flexDirection="row" alignItems="center" marginBottom={20} w="$full" mx="auto" justifyContent="flex-start">
          <MaterialCommunityIcons name="home" size={28} color="$textLight900" />
          <GluestackText fontSize="$xl" fontWeight="$bold" marginLeft={10}>Home Screen</GluestackText>
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
          <GluestackText color="$white" fontSize="$2xl" fontWeight="$bold" marginBottom={8}>환영합니다!</GluestackText>
          <GluestackText color="$white" fontSize="$md" lineHeight={24}>이 앱은 React Native와 Expo로 만들어진 샘플 앱입니다.</GluestackText>
        </Box>

        {/* React Native Paper의 Card 컴포넌트 사용 예시 */}
                <AppCard
          title="첫 번째 카드"
          description="이것은 React Native Paper의 카드 컴포넌트입니다."
          navigateTo="Detail"
          buttonText="상세 화면으로"
        />

                        <AppCard
          title="두 번째 카드"
          description="다양한 정보를 표시하는 데 활용할 수 있습니다."
          navigateTo="Settings"
          buttonText="설정 화면으로"
        />
      </Box>
    </Box>
  );
};



export default HomeScreen;
