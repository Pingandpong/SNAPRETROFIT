import React from 'react';
import { View } from 'react-native';
import { Heading, Text, VStack, Button, ButtonText } from '@gluestack-ui/themed';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { appTheme } from '../theme/gluestack-ui.theme';

type Variant = 'empty' | 'offline' | 'error';

interface Props {
  variant: Variant;
  title: string;
  message?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  tone?: 'light' | 'dark';
}

const ICONS: Record<Variant, keyof typeof Feather.glyphMap> = {
  empty: 'inbox',
  offline: 'wifi-off',
  error: 'alert-triangle',
};

const StateView: React.FC<Props> = ({ variant, title, message, actionLabel, onActionPress, tone }) => {
  const { colorMode } = useTheme();
  const isDark = tone ? tone === 'dark' : colorMode === 'dark';
  const iconColor = isDark ? '#ffffff' : '#0f172a';
  const subtle = isDark ? 'rgba(255,255,255,0.65)' : 'rgba(15,23,42,0.65)';

  return (
    <Animated.View entering={FadeInUp.duration(280)}>
      <VStack className="items-center justify-center py-10 px-4">
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            marginBottom: 12,
          }}
        >
          <Feather name={ICONS[variant]} size={28} color={iconColor} />
        </View>
        <Heading size="lg" className="text-center" style={{ color: iconColor }}>
          {title}
        </Heading>
        {message ? (
          <Text className="text-center mt-2" style={{ color: subtle }}>
            {message}
          </Text>
        ) : null}
        {actionLabel && onActionPress ? (
          <Button className="mt-4 rounded-full bg-primary-500 px-5 h-11 items-center justify-center">
            <ButtonText onPress={onActionPress}>{actionLabel}</ButtonText>
          </Button>
        ) : null}
      </VStack>
    </Animated.View>
  );
};

export default StateView;
