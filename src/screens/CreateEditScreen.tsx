import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Feather} from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { commonStyles } from '../styles/commonStyles';

import { useTranslation } from 'react-i18next';

type CreateEditScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEdit'>;

const CreateEditScreen = ({ navigation }: CreateEditScreenProps) => {
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
          <Text style={commonStyles.headerTitle}>{t('create_edit_screen_title')}</Text>
        </View>
        <View style={commonStyles.content}>
          <Text style={commonStyles.contentText}>{t('create_edit_screen_message')}</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CreateEditScreen;
