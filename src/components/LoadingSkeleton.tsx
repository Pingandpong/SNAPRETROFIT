import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingSkeleton = () => (
  <View style={styles.skeleton}>
      <Text style={{color: 'white'}}>Loading Skeleton</Text>
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    width: "100%", 
    height: 80, 
    backgroundColor: '#333',
    borderRadius: 8, 
    marginBottom: 16, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

export default LoadingSkeleton;