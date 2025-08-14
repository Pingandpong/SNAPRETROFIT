import React from 'react';
import { Box, Text as GluestackText, Button, ButtonText } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
  Settings: undefined;
};

type AppCardProps = {
  title: string;
  description: string;
  navigateTo: keyof RootStackParamList;
  buttonText: string;
};

const AppCard = ({ title, description, navigateTo, buttonText }: AppCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Box w="$full" mx="auto" marginVertical={10} borderRadius={12} shadowColor="$black" shadowOffset={{ width: 0, height: 2 }} shadowOpacity={0.25} shadowRadius={3.84} elevation={5} bg="$backgroundLight0">
      <Box p="$4">
        <GluestackText fontSize="$lg" fontWeight="$bold" color="$textLight900">{title}</GluestackText>
        <GluestackText fontSize="$md" color="$textLight600">{description}</GluestackText>
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
