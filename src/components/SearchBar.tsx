import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { appTheme } from '../theme/gluestack-ui.theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChangeText, placeholder }: SearchBarProps) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';
  const containerBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const textColor = isDark
    ? appTheme.tokens.colors.textDark
    : appTheme.tokens.colors.textLight;
  const iconColor = isDark ? '#ffffff' : '#334155';
  const placeholderColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(51,65,85,0.5)';

  return (
    <View style={[styles.container, { backgroundColor: containerBg }]}>
      <Feather name="search" size={20} color={iconColor} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: textColor }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
});

export default SearchBar;
