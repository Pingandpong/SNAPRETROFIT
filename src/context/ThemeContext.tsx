import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the context data
interface ThemeContextData {
  colorMode: 'light' | 'dark';
  setColorMode: (mode: 'light' | 'dark') => void;
  toggleColorMode: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

// Create a provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useColorScheme();
  const [colorMode, setColorModeState] = useState<'light' | 'dark'>(systemTheme || 'light');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme !== null) {
          setColorModeState(savedTheme as 'light' | 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error);
      }
    };

    loadTheme();
  }, []);

  const setColorMode = async (mode: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem('theme', mode);
      setColorModeState(mode);
    } catch (error) {
      console.error('Failed to save theme to storage', error);
    }
  };

  const toggleColorMode = () => {
    const newMode = colorMode === 'light' ? 'dark' : 'light';
    setColorMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
