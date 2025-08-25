import React from 'react';
import { Button } from '@gluestack-ui/themed';
import { Feather } from '@expo/vector-icons';

interface Props {
  onPress: () => void;
  label: string;
}

const FloatingActionButton: React.FC<Props> = ({ onPress, label }) => (
  <Button
    style={{width: 64, height: 64, borderRadius: 32, backgroundColor: '#7d5cff', justifyContent: 'center', alignItems: 'center'}}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
  >
    <Feather name="plus" size={24} color="white" />
  </Button>
);

export default FloatingActionButton;