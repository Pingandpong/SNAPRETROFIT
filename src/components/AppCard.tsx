import React from 'react';
import { Box, Heading, Text, Pressable, VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface AppCardProps {
  title: string;
  description: string;
  navigateTo: {
    [K in keyof RootStackParamList]: RootStackParamList[K] extends undefined ? K : never;
  }[keyof RootStackParamList];
  className?: string;
}

const AppCard = ({ title, description, navigateTo, className = '' }: AppCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() => navigation.navigate(navigateTo)}
      className={`rounded-xl overflow-hidden shadow-soft-2 dark:shadow-neumo-dark bg-cardLight dark:bg-cardDark ${className}`}
    >
      <Box className="w-full h-32 bg-primary500" />
      <VStack className="p-4 space-y-2">
        <Heading size="md" className="text-textLight dark:text-textDark font-semibold">
          {title}
        </Heading>
        <Text size="sm" className="text-textLight dark:text-textDark opacity-80">
          {description}
        </Text>
      </VStack>
    </Pressable>
  );
};

export default AppCard;
