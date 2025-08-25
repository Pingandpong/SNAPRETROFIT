import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

interface FloatingActionButtonProps {
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
}

const FloatingActionButton = ({ icon, onPress }: FloatingActionButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} accessibilityRole="button">
        <LinearGradient colors={['#7d5cff', '#5d3aff']} style={styles.button}>
          <Feather name={icon} size={28} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7d5cff',
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
});

export default FloatingActionButton;
