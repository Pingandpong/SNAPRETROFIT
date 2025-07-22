import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
  Settings: undefined;
};

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#FFFBFE', elevation: 0 }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#1C1B1F" />
        <Appbar.Content title="설정" color="#1C1B1F" />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={styles.text}>여기는 설정 화면입니다.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
});

export default SettingsScreen;
