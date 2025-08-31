import React, { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button, ButtonText } from '@gluestack-ui/themed';
import { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export type AppButtonVariant = 'primary' | 'secondary' | 'outline' | 'link';
export type AppButtonSize = 'sm' | 'md' | 'lg';

interface Props extends ComponentProps<typeof Button> {
  title: string;
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  loading?: boolean;
  leftIcon?: keyof typeof Feather.glyphMap;
  fullWidth?: boolean;
}

const variantClass: Record<AppButtonVariant, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  outline: 'border border-primary-500 bg-transparent',
  link: 'bg-transparent',
};

const sizeClass: Record<AppButtonSize, { container: string; text: string }> = {
  sm: { container: 'h-9 px-3 rounded-full', text: 'text-sm' },
  md: { container: 'h-11 px-4 rounded-full', text: 'text-base' },
  lg: { container: 'h-12 px-5 rounded-full', text: 'text-base' },
};

const AppButton: React.FC<Props> = ({
  title,
  variant = 'primary',
  size = 'md',
  className,
  loading,
  disabled,
  leftIcon,
  fullWidth,
  ...props
}) => {
  const opacity = disabled ? 'opacity-50' : '';
  const width = fullWidth ? 'w-full' : '';
  const contentColor = variant === 'outline' || variant === 'link' ? '#4F46E5' : '#ffffff';

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const onPressIn = () => { scale.value = withTiming(0.97, { duration: 80 }); };
  const onPressOut = () => { scale.value = withTiming(1, { duration: 120 }); };

  return (
    <Animated.View style={animatedStyle}>
      <Button
        className={`${variantClass[variant]} ${sizeClass[size].container} ${opacity} ${width} ${className || ''}`}
        disabled={disabled || loading}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        {...props}
      >
        {loading ? (
          <View className="flex-row items-center">
            <ActivityIndicator color={contentColor} />
          </View>
        ) : (
          <View className="flex-row items-center">
            {leftIcon ? <Feather name={leftIcon} size={16} color={contentColor} /> : null}
            <ButtonText className={`${sizeClass[size].text} ${leftIcon ? 'ml-2' : ''}`}>{title}</ButtonText>
          </View>
        )}
      </Button>
    </Animated.View>
  );
};

export default AppButton;
