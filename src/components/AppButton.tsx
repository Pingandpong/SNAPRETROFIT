import React from 'react';
import { Button, ButtonText } from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

export type AppButtonVariant = 'primary' | 'secondary' | 'outline';

interface Props extends ComponentProps<typeof Button> {
  title: string;
  variant?: AppButtonVariant;
}

const variantClass: Record<AppButtonVariant, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  outline: 'border border-primary-500 bg-transparent',
};

const AppButton: React.FC<Props> = ({ title, variant = 'primary', ...props }) => {
  return (
    <Button className={variantClass[variant]} {...props}>
      <ButtonText>{title}</ButtonText>
    </Button>
  );
};

export default AppButton;
