import React from 'react';
import { Button, Icon } from '@gluestack-ui/themed';
import { Feather } from '@expo/vector-icons';

interface Props {
  onPress: () => void;
  label: string;
}

const FloatingActionButton: React.FC<Props> = ({ onPress, label }) => (
  <Button
    className="w-16 h-16 rounded-full bg-primary-500 shadow-neumo-dark justify-center items-center"
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
  >
    <Icon as={Feather} name="plus" size="xl" className="text-white" />
  </Button>
);

export default FloatingActionButton;
