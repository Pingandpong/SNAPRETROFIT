import React from 'react';
import { HStack, Text } from '@gluestack-ui/themed';
import { useTheme } from '../context/ThemeContext';
import { appTheme } from '../theme/gluestack-ui.theme';

interface SectionHeaderProps {
  title: string;
  action?: React.ReactNode;
  className?: string;
  tone?: 'light' | 'dark';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, action, className, tone }) => {
  const { colorMode } = useTheme();
  const isDark = tone ? tone === 'dark' : colorMode === 'dark';
  const color = isDark ? appTheme.tokens.colors.textDark : appTheme.tokens.colors.textLight;

  return (
    <HStack className={`items-center justify-between mb-2 ${className || ''}`}>
      <Text className="text-lg font-semibold" style={{ color }}>{title}</Text>
      {action ?? null}
    </HStack>
  );
};

export default SectionHeader;
