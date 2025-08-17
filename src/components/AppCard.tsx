import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Heading, Text, Pressable, HStack, VStack, Box } from '@gluestack-ui/themed';
import { Feather } from '@expo/vector-icons'; // Using Feather as an example

type AppCardProps = {
  title: string;
  description: string;
  navigateTo: {
    [K in keyof RootStackParamList]: RootStackParamList[K] extends undefined ? K : never;
  }[keyof RootStackParamList];
  iconName: React.ComponentProps<typeof Feather>['name'];
};

const AppCard = ({ title, description, navigateTo, iconName }: AppCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() => navigation.navigate(navigateTo)}
      className="w-full my-2 rounded-xl overflow-hidden shadow-neumo-light dark:shadow-neumo-dark bg-backgroundLight dark:bg-backgroundDark hover:bg-cardHoverLight dark:hover:bg-cardHoverDark"
    >
      <HStack className="space-x-4 p-5 items-center">
        <Box className="w-12 h-12 rounded-full flex justify-center items-center bg-cardLight dark:bg-cardDark shadow-neumo-light dark:shadow-neumo-dark">
          <Feather name={iconName} size={24} className="text-textLight dark:text-textDark" />
        </Box>
        <VStack className="flex-1">
          <Heading size="md" className="text-textLight dark:text-textDark font-semibold">
            {title}
          </Heading>
          <Text size="sm" className="text-textLight dark:text-textDark opacity-80">
            {description}
          </Text>
        </VStack>
        <Feather name="chevron-right" size={20} className="text-textLight dark:text-textDark opacity-60" />
      </HStack>
    </Pressable>
  );
};

export default AppCard;