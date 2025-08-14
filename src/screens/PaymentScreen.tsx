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
  ScrollView, // ScrollView를 추가하여 작은 화면에서도 잘 보이도록 합니다.
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Payment: undefined;
  // 다른 스크린 타입들을 여기에 추가할 수 있습니다.
};

type PaymentScreenProps = NativeStackScreenProps<RootStackParamList, 'Payment'>;

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <HStack space="md" alignItems="center">
    <Icon as={CheckIcon} color="$green500" />
    <Text>{children}</Text>
  </HStack>
);

const PaymentScreen = ({ navigation }: PaymentScreenProps) => {
  return (
    <ScrollView flex={1} bg="$backgroundLight0">
      <Box p="$5">
        <VStack space="xl" alignItems="center">
          <Box alignItems="center" py="$4">
            <Heading size="2xl" mb="$2">
              요금제를 선택하세요
            </Heading>
            <Text textAlign="center">
              언제든지 요금제를 변경하거나 구독을 취소할 수 있습니다.
            </Text>
          </Box>

          {/* 가로(HStack)가 아닌 세로(VStack)로 변경하여 카드들을 수직으로 쌓습니다. */}
          <VStack space="lg" w="100%">
            {/* Basic Plan Card */}
            <Box
              p="$6"
              borderWidth={1}
              borderColor="$borderLight300"
              borderRadius="$lg"
            >
              <VStack space="md">
                <Heading size="xl">Basic</Heading>
                <Text fontSize="$2xl" fontWeight="$bold">
                  월 5,000원
                </Text>
                <VStack space="sm" mt="$4">
                  <FeatureItem>기본 기능 사용</FeatureItem>
                  <FeatureItem>커뮤니티 지원</FeatureItem>
                </VStack>
                <Button mt="$6" variant="outline">
                  <ButtonText>Basic 플랜 선택</ButtonText>
                </Button>
              </VStack>
            </Box>

            {/* Premium Plan Card */}
            <Box
              p="$6"
              borderWidth={2}
              borderColor="$primary500"
              borderRadius="$lg"
              bg="$primary50"
            >
              <VStack space="md">
                <Heading size="xl">Premium</Heading>
                <Text fontSize="$2xl" fontWeight="$bold">
                  월 10,000원
                </Text>
                <VStack space="sm" mt="$4">
                  <FeatureItem>모든 기능 사용</FeatureItem>
                  <FeatureItem>광고 없이 사용</FeatureItem>
                  <FeatureItem>우선 고객 지원</FeatureItem>
                </VStack>
                <Button mt="$6">
                  <ButtonText>Premium 플랜 선택</ButtonText>
                </Button>
              </VStack>
            </Box>
          </VStack>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default PaymentScreen;
