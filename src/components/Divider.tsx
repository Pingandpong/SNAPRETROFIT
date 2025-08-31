import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Divider: React.FC<{ className?: string }> = ({ className }) => {
  const { colorMode } = useTheme();
  const color = colorMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  return <View className={`w-full my-2 ${className || ''}`} style={{ height: 1, backgroundColor: color }} />;
};

export default Divider;

