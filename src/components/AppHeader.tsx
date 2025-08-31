import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { commonStyles } from '../styles/commonStyles';
import { useTheme } from '../context/ThemeContext';
import { appTheme } from '../theme/gluestack-ui.theme';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  tone?: 'light' | 'dark';
}

const AppHeader = ({ title, showBackButton = false, onBackPress, rightAction, tone }: AppHeaderProps) => {
  const { colorMode } = useTheme();
  const isDark = tone ? tone === 'dark' : colorMode === 'dark';
  const textColor = isDark ? appTheme.tokens.colors.textDark : appTheme.tokens.colors.textLight;
  const iconColor = isDark ? '#ffffff' : '#0f172a';

  return (
    <View style={commonStyles.header}>
      {showBackButton && (
        <TouchableOpacity
          onPress={onBackPress}
          style={commonStyles.backButton}
          accessibilityRole="button"
          accessibilityLabel={title}
        >
          <Feather name="arrow-left" size={24} color={iconColor} />
        </TouchableOpacity>
      )}
      <Text style={[commonStyles.headerTitle, { color: textColor }]}>{title}</Text>
      {rightAction && <View style={{ marginLeft: 'auto' }}>{rightAction}</View>}
    </View>
  );
};

export default AppHeader;
