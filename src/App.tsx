import '../global.css';
import i18next from './services/i18n';
import './config/firebaseConfig';
import AppNavigator from './navigation/AppNavigator';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { initNotifications, registerForPushNotificationsAsync } from './services/notifications';
import { Roboto_100Thin, Roboto_300Light, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
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
    Poppins_400Regular,
    Poppins_500Medium,
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

  useEffect(() => {
    initNotifications();
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        console.log('Expo push token:', token);
      }
    });
  }, []);

  if (!fontsLoaded || !languageLoaded) {
    return null;
  }

  // Wrap the Root component with our ThemeProvider
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
