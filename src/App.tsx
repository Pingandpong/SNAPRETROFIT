import '../global.css';
import i18next from './services/i18n';
import './config/firebaseConfig';
import AppNavigator from './navigation/AppNavigator';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Roboto_100Thin, Roboto_300Light, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { appTheme } from './theme/gluestack-ui.theme'; // Import our custom theme
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

// Root component to access theme context and pass it to the provider
const Root = () => {
  const { colorMode } = useTheme();
  return (
    <GluestackUIProvider config={appTheme} colorMode={colorMode}>
      <AppNavigator />
    </GluestackUIProvider>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  const [languageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
          await i18next.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load language from storage', error);
      } finally {
        setLanguageLoaded(true);
      }
    };

    loadLanguage();
  }, []);

  useEffect(() => {
    if (fontsLoaded && languageLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, languageLoaded]);

  if (!fontsLoaded || !languageLoaded) {
    return null;
  }

  // Wrap the Root component with our ThemeProvider
  return (
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}
