import React from 'react';
import { Button } from '@gluestack-ui/themed';
import { Feather } from '@expo/vector-icons';

interface AppIconButtonProps {
  name: keyof typeof Feather.glyphMap;
  onPress?: () => void;
  accessibilityLabel?: string;
  variant?: 'solid' | 'outline' | 'ghost';
}

const AppIconButton: React.FC<AppIconButtonProps> = ({
  name,
  onPress,
  accessibilityLabel,
  variant = 'solid',
}) => {
  const base = 'w-12 h-12 rounded-full items-center justify-center';
  const styles = {
    solid: `${base} bg-primary-500`,
    outline: `${base} border border-primary-500 bg-transparent`,
    ghost: `${base} bg-transparent`,
  } as const;

  return (
    <Button
      className={styles[variant]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Feather name={name} size={20} color="#fff" />
    </Button>
  );
};

export default AppIconButton;

