import React from 'react';
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
import { useForm, Controller } from 'react-hook-form';

type CreateEditScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateEdit'>;

const CreateEditScreen = ({ navigation }: CreateEditScreenProps) => {
  const { t } = useTranslation();
  const showToast = useAppToast();
  const { control, handleSubmit, formState: { errors } } = useForm<{ title: string }>({
    defaultValues: { title: '' },
  });
  const [saving, setSaving] = React.useState(false);

  const onSubmit = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast({ title: t('saved') });
      navigation.goBack();
    }, 500);
  };
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
          <Controller
            control={control}
            name="title"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                placeholder={t('create_edit_screen_message')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                accessibilityLabel={t('create_edit_screen_message')}
                errorText={errors.title ? t('required_field') : undefined}
              />
            )}
          />
          <AppButton
            title={t('save')}
            onPress={handleSubmit(onSubmit)}
          />
          {saving && <LoadingOverlay />}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CreateEditScreen;
