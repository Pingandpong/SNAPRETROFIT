import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateEditScreen from '../screens/CreateEditScreen';
import PaymentScreen from '../screens/PaymentScreen';
import { RootStackParamList } from './types';
import { useTheme } from '../context/ThemeContext';
import { appTheme } from '../theme/gluestack-ui.theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Customize themes to match our app's background colors
const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: appTheme.tokens.colors.backgroundLight,
  },
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: appTheme.tokens.colors.backgroundDark,
  },
};

const AppNavigator = () => {
  const { colorMode } = useTheme();

  return (
    <NavigationContainer theme={colorMode === 'dark' ? MyDarkTheme : MyLightTheme}>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0b0e23' }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="CreateEdit" component={CreateEditScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;