import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Feather} from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { commonStyles } from '../styles/commonStyles';

import { useTranslation } from 'react-i18next';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { useAppToast } from '../providers/ToastProvider';
import LoadingOverlay from '../components/LoadingOverlay';

type CreateEditScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEdit'>;

const CreateEditScreen = ({ navigation }: CreateEditScreenProps) => {
  const { t } = useTranslation();
  const showToast = useAppToast();
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
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
          <AppInput
            placeholder={t('create_edit_screen_message')}
            value={title}
            onChangeText={setTitle}
            accessibilityLabel={t('create_edit_screen_message')}
          />
          <AppButton
            title={t('save')}
            onPress={() => {
              setSaving(true);
              setTimeout(() => {
                setSaving(false);
                showToast({ title: t('saved') });
                navigation.goBack();
              }, 500);
            }}
          />
          {saving && <LoadingOverlay />}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CreateEditScreen;
