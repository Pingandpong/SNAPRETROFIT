import React from 'react';
import { Box, Text as GluestackText, Button, ButtonText } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';

type AppCardProps = {
  title: string;
  description: string;
  navigateTo: keyof RootStackParamList;
  buttonText: string;
};

const AppCard = ({ title, description, navigateTo, buttonText }: AppCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colorMode } = useTheme(); // Call useTheme hook

  return (
    <Box w="$full" mx="auto" marginVertical={10} borderRadius={12} shadowColor="$black" shadowOffset={{ width: 0, height: 2 }} shadowOpacity={0.25} shadowRadius={3.84} elevation={5} bg={colorMode === 'dark' ? '$cardDark' : '$cardLight'}>
      <Box p="$4">
        <GluestackText fontSize="$lg" fontWeight="$bold" color={colorMode === 'dark' ? '$textDark' : '$textLight'}>{title}</GluestackText>
        <GluestackText fontSize="$md" color={colorMode === 'dark' ? '$textDark' : '$textLight'}>{description}</GluestackText>
      </Box>
      <Box flexDirection="row" justifyContent="flex-end" p="$2">
        <Button onPress={() => navigation.navigate(navigateTo)} marginHorizontal={8}>
          <ButtonText>{buttonText}</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default AppCard;
