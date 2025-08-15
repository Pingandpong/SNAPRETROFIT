import './services/i18n';
import './config/firebaseConfig';
import AppNavigator from './navigation/AppNavigator';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Roboto_100Thin, Roboto_300Light, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { appTheme } from './theme/gluestack-ui.theme'; // Import our custom theme

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

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // Wrap the Root component with our ThemeProvider
  return (
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}
