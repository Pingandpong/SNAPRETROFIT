import React from 'react';
import { Text } from '@gluestack-ui/themed';

type Variant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface AppBadgeProps {
  label: string;
  variant?: Variant;
  className?: string;
}

const styles: Record<Variant, string> = {
  primary: 'bg-primary-500/15 text-primary-500',
  success: 'bg-green-500/15 text-green-500',
  warning: 'bg-amber-500/20 text-amber-600',
  danger: 'bg-rose-500/15 text-rose-500',
  neutral: 'bg-$background-200 dark:bg-$background-800 text-typography-600',
};

const AppBadge: React.FC<AppBadgeProps> = ({ label, variant = 'neutral', className }) => {
  return (
    <Text className={`px-2 py-1 rounded-full text-xs ${styles[variant]} ${className || ''}`}>
      {label}
    </Text>
  );
};

export default AppBadge;

