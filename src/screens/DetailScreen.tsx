import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Feather} from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getMockDataById } from '../data/mockData';
import { commonStyles } from '../styles/commonStyles';

import { useTranslation } from 'react-i18next';

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({ route, navigation }: DetailScreenProps) => {
  const { itemId } = route.params;
  const item = getMockDataById(itemId);
  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={['#0b0e23', '#151929']}
      style={commonStyles.container}>
      <SafeAreaView style={commonStyles.safe}>
        <View style={commonStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={commonStyles.backButton}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={commonStyles.headerTitle}>{item ? item.title : t('detail_screen_title')}</Text>
        </View>
        <ScrollView style={styles.content}>
          {item ? (
            <View>
              <View style={styles.imagePlaceholder} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={commonStyles.contentText}>{item.content}</Text>
            </View>
          ) : (
            <Text style={commonStyles.contentText}>{t('item_not_found_message')}</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
  content: {
    ...commonStyles.content,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#333',
    borderRadius: 12,
    marginBottom: 24,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  contentText: {
    ...commonStyles.contentText,
    lineHeight: 24,
  },
});

export default DetailScreen;