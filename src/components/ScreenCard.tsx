import React from 'react';
import { Pressable, HStack, Box, Text } from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { appTheme } from '../theme/gluestack-ui.theme';

export type FeatherIconName = keyof typeof Feather.glyphMap;

interface ScreenCardProps {
  icon: FeatherIconName;
  title: string;
  subtitle?: string;
  navigateTo: {
    [K in keyof RootStackParamList]: RootStackParamList[K] extends undefined ? K : never;
  }[keyof RootStackParamList];
  className?: string;
}

const ScreenCard = ({ icon, title, subtitle, navigateTo, className = '' }: ScreenCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cardGradientStart, cardGradientEnd } = appTheme.tokens.colors;

  return (
    <Pressable
      onPress={() => navigation.navigate(navigateTo)}
      className={`flex-1 rounded-2xl overflow-hidden shadow-soft-2 dark:shadow-neumo-dark ${className}`}
      style={{ minHeight: 120 }}
    >
      <LinearGradient
        colors={[cardGradientStart, cardGradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, padding: 16, justifyContent: 'center' }}
      >
        <HStack className="items-center justify-between">
          <HStack className="items-center space-x-3">
            <Box className="p-3 rounded-full bg-white/20">
              <Feather name={icon} size={24} color="#fff" />
            </Box>
            <Box>
              <Text className="text-white font-medium font-poppins">{title}</Text>
              {subtitle && (
                <Text className="text-white/80 text-xs mt-1 font-poppins">{subtitle}</Text>
              )}
            </Box>
          </HStack>
          <Feather name="chevron-right" size={20} color="#fff" />
        </HStack>
      </LinearGradient>
    </Pressable>
  );
};

export default ScreenCard;
