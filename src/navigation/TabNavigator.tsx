import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7d5cff',
        tabBarStyle: { backgroundColor: '#0b0e23', borderTopColor: 'transparent' },
      }}
    >
      <Tab.Screen
        name="Home"
        component= {HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Screen2"
        component={Screen2}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="square" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Screen3"
        component={Screen3}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;