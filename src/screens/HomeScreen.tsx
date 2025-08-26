import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, DevSettings } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, Heading } from '@gluestack-ui/themed';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../navigation/types';
import ScreenSelectionModal from '../components/ScreenSelectionModal';
import FloatingActionButton from '../components/FloatingActionButton';
import { useTranslation } from 'react-i18next';
import AppButton from '../components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleResetOnboarding = async () => {
    await AsyncStorage.removeItem('onboarded');
    DevSettings.reload();
  };

  return (
    <LinearGradient colors={['#0b0e23', '#151929']} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Box style={{flex: 1, padding: 24, paddingTop: 120}}>
            <View style={{ marginBottom: 24 }}>
              <Heading size="xl" style={{color: 'white', textAlign: 'left'}}>
                {t('welcome_message') || 'Welcome!'}
              </Heading>
              <Text style={{color: 'rgba(255,255,255,0.7)', marginTop: 4}}>
                {t('home_subtitle') || 'Explore the features.'}
              </Text>
            </View>

            <Box style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 24, padding: 24}}>
              <Heading size="lg" style={{color: 'white', textAlign: 'center', marginBottom: 16}}>
                {t('app_title')}
              </Heading>
              <AppButton title="Reset Onboarding" onPress={handleResetOnboarding} />
            </Box>

          </Box>
        </ScrollView>
        <Box style={{position: 'absolute', bottom: 50, left: 0, right: 0, alignItems: 'center'}}>
          <FloatingActionButton
            onPress={() => setModalVisible(true)}
            label={t('add_item_button')}
          />
        </Box>
        <ScreenSelectionModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          navigation={navigation}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;