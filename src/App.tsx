import './config/firebaseConfig'; // Initialize Firebase
import AppNavigator from './navigation/AppNavigator';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Roboto_100Thin, Roboto_300Light, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';

SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6750A4', // Material Design 3 inspired Purple
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005D',
    secondary: '#625B71',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8DEF8',
    onSecondaryContainer: '#1D192B',
    tertiary: '#7D5260',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FFD8E4',
    onTertiaryContainer: '#31111D',
    error: '#B3261E',
    onError: '#FFFFFF',
    errorContainer: '#F9DEDC',
    onErrorContainer: '#410E0B',
    background: '#FFFBFE',
    onBackground: '#1C1B1F',
    surface: '#FFFBFE',
    onSurface: '#1C1B1F',
    surfaceVariant: '#E7E0EC',
    onSurfaceVariant: '#49454F',
    outline: '#79747E',
    inverseOnSurface: '#F4EFF4',
    inverseSurface: '#313033',
    inversePrimary: '#D0BCFF',
    shadow: '#000000',
    surfaceTint: '#6750A4',
    outlineVariant: '#CAC4D0',
    scrim: '#000000',
  },
  fonts: {
    ...DefaultTheme.fonts,
    displayLarge: {
      ...DefaultTheme.fonts.displayLarge,
      fontFamily: 'Roboto_300Light',
    },
    headlineLarge: {
      ...DefaultTheme.fonts.headlineLarge,
      fontFamily: 'Roboto_400Regular',
    },
    titleLarge: {
      ...DefaultTheme.fonts.titleLarge,
      fontFamily: 'Roboto_500Medium',
    },
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: 'Roboto_400Regular',
    },
    bodyMedium: {
      ...DefaultTheme.fonts.bodyMedium,
      fontFamily: 'Roboto_400Regular',
    },
    labelLarge: {
      ...DefaultTheme.fonts.labelLarge,
      fontFamily: 'Roboto_500Medium',
    },
    // 필요한 다른 타이포그래피 속성들도 여기에 추가할 수 있습니다.
  },
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

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}
