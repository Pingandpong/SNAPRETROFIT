import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingOverlay = () => (
  <View className="absolute inset-0 items-center justify-center bg-black/50">
    <ActivityIndicator size="large" color="#ffffff" />
  </View>
);

export default LoadingOverlay;
