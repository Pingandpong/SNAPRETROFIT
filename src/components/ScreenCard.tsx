import React from 'react';
import { Pressable, HStack, Box, Text } from '@gluestack-ui/themed';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

export type FeatherIconName = keyof typeof Feather.glyphMap;

interface ScreenCardProps {
  icon: FeatherIconName;
  title: string;
  navigateTo: {
    [K in keyof RootStackParamList]: RootStackParamList[K] extends undefined ? K : never;
  }[keyof RootStackParamList];
  className?: string;
}

const ScreenCard = ({ icon, title, navigateTo, className = '' }: ScreenCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() => navigation.navigate(navigateTo)}
      className={`px-4 py-3 rounded-xl bg-cardLight dark:bg-cardDark flex-row items-center justify-between shadow-soft-1 dark:shadow-neumo-dark ${className}`}
    >
      <HStack className="items-center space-x-4">
        <Box className="p-3 rounded-full bg-primary500">
          <Feather name={icon} size={20} color="#fff" />
        </Box>
        <Text className="text-textLight dark:text-textDark font-medium">{title}</Text>
      </HStack>
      <Feather name="chevron-right" size={20} className="text-textLight dark:text-textDark opacity-60" />
    </Pressable>
  );
};

export default ScreenCard;
