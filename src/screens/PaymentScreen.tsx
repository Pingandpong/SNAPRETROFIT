import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  ButtonText,
  VStack,
  HStack,
  Icon,
  CheckIcon,
  ScrollView,
  Pressable,
  useToken,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types'; // Import from types.ts
import { Feather } from '@expo/vector-icons'; // For back arrow icon
import { LinearGradient } from 'expo-linear-gradient';

type PaymentScreenProps = NativeStackScreenProps<RootStackParamList, 'Payment'>;

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <HStack className="space-x-2 items-center">
    <Icon as={CheckIcon} className="text-green500" />
    <Text>{children}</Text>
  </HStack>
);

const PaymentScreen = ({ navigation }: PaymentScreenProps) => {
  const [bgStart, bgEnd] = useToken('colors', ['homeBgStart', 'homeBgEnd']);

  return (
    <LinearGradient
      colors={[bgStart, bgEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <VStack className="flex-1">
        {/* Header */}
        <HStack className="items-center border-b p-4 pt-8 border-borderLight dark:border-borderDark justify-between">
          <Pressable onPress={() => navigation.goBack()} className="mr-4">
            <Feather name="arrow-left" size={24} className="text-textLight dark:text-textDark text-shadow-neumo-icon" />
          </Pressable>
          <Heading size="lg" className="text-textLight dark:text-textDark">
            요금제
          </Heading>
        </HStack>

        <ScrollView contentContainerStyle={{ padding: 24 }}>
          <VStack className="space-y-8 items-center">
            <Box className="items-center py-4">
              <Heading size="2xl" className="mb-2">
                요금제를 선택하세요
              </Heading>
              <Text className="text-center">
                언제든지 요금제를 변경하거나 구독을 취소할 수 있습니다.
              </Text>
            </Box>

            {/* 가로(HStack)가 아닌 세로(VStack)로 변경하여 카드들을 수직으로 쌓습니다. */}
            <VStack className="space-y-4 w-full">
              {/* Basic Plan Card */}
              <Box className="p-6 border border-borderLight dark:border-borderDark rounded-lg shadow-md">
                <VStack className="space-y-4">
                  <Heading size="xl">Basic</Heading>
                  <Text className="text-2xl font-bold">월 5,000원</Text>
                  <VStack className="space-y-2 mt-4">
                    <FeatureItem>기본 기능 사용</FeatureItem>
                    <FeatureItem>커뮤니티 지원</FeatureItem>
                  </VStack>
                  <Button className="mt-6" variant="outline">
                    <ButtonText>Basic 플랜 선택</ButtonText>
                  </Button>
                </VStack>
              </Box>

              {/* Premium Plan Card */}
              <Box className="p-6 border-2 border-primary500 rounded-lg shadow-md bg-primary50">
                <VStack className="space-y-4">
                  <Heading size="xl">Premium</Heading>
                  <Text className="text-2xl font-bold">월 10,000원</Text>
                  <VStack className="space-y-2 mt-4">
                    <FeatureItem>모든 기능 사용</FeatureItem>
                    <FeatureItem>광고 없이 사용</FeatureItem>
                    <FeatureItem>우선 고객 지원</FeatureItem>
                  </VStack>
                  <Button className="mt-6">
                    <ButtonText>Premium 플랜 선택</ButtonText>
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>
    </LinearGradient>
  );
};

export default PaymentScreen;
