import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { commonStyles } from '../styles/commonStyles';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
}

const AppHeader = ({ title, showBackButton = false, onBackPress, rightAction }: AppHeaderProps) => {
  return (
    <View style={commonStyles.header}>
      {showBackButton && (
        <TouchableOpacity
          onPress={onBackPress}
          style={commonStyles.backButton}
          accessibilityRole="button"
          accessibilityLabel={title}
        >
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
      )}
      <Text style={commonStyles.headerTitle}>{title}</Text>
      {rightAction && <View style={{ marginLeft: 'auto' }}>{rightAction}</View>}
    </View>
  );
};

export default AppHeader;
