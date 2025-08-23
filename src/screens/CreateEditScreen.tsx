import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Text,
  Heading,
  VStack,
  HStack,
  Pressable,
  useToken,
} from '@gluestack-ui/themed';
import { RootStackParamList } from '../navigation/types';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type CreateEditScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEdit'>;

const CreateEditScreen = ({ navigation }: CreateEditScreenProps) => {
  const [bgStart, bgEnd] = useToken('colors', ['homeBgStart', 'homeBgEnd']);

  return (
    <LinearGradient
      colors={[bgStart, bgEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <VStack className="flex-1">
        <HStack className="items-center border-b p-4 pt-8 border-borderLight dark:border-borderDark">
          <Pressable onPress={() => navigation.goBack()} className="mr-4">
            <Feather name="arrow-left" size={24} className="text-textLight dark:text-textDark text-shadow-neumo-icon" />
          </Pressable>
          <Heading size="lg" className="text-textLight dark:text-textDark">
            생성/편집 화면
          </Heading>
        </HStack>
        <VStack className="flex-1 p-6 justify-center items-center">
          <Text className="text-xl text-textLight dark:text-textDark">
            여기는 생성/편집 화면입니다.
          </Text>
        </VStack>
      </VStack>
    </LinearGradient>
  );
};

export default CreateEditScreen;
