import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Heading,
  Text,
  HStack,
  Pressable,
  VStack,
  useToken,
} from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../navigation/types';
import { getMockDataById } from '../data/mockData';
import { Feather } from '@expo/vector-icons';

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({ route, navigation }: DetailScreenProps) => {
  const { itemId } = route.params;
  const item = getMockDataById(itemId);

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
          <Heading size="lg" className="text-textLight dark:text-textDark font-semibold" isTruncated>
            {item ? item.title : 'Detail'}
          </Heading>
        </HStack>

        <VStack className="flex-1 p-6 space-y-4">
          <Box className="w-full h-48 bg-primary500" />
          {item ? (
            <>
              <Heading size="xl" className="text-textLight dark:text-textDark font-bold">
                {item.title}
              </Heading>
              <Text size="md" className="leading-6 text-textLight dark:text-textDark opacity-80">
                {item.content}
              </Text>
            </>
          ) : (
            <Text className="text-textLight dark:text-textDark">
              Item not found.
            </Text>
          )}
        </VStack>
      </VStack>
    </LinearGradient>
  );
};

export default DetailScreen;