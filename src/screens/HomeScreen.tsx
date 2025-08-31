import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, DevSettings } from 'react-native';
import { Box, Heading } from '@gluestack-ui/themed';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../navigation/types';
// import ScreenSelectionModal from '../components/ScreenSelectionModal';
import FloatingActionButton from '../components/FloatingActionButton';
import { useTranslation } from 'react-i18next';
import AppButton from '../components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppScreen from '../components/AppScreen';

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const handleResetOnboarding = async () => {
    await AsyncStorage.removeItem('onboarded');
    DevSettings.reload();
  };

  return (
    <React.Fragment>
      <AppScreen scroll={false}>
        <View style={{ flex: 1, position: 'relative' }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Box style={{ flex: 1, paddingTop: 120 }}>
              <View style={{ marginBottom: 24 }}>
                <Heading size="xl" style={{ color: 'white', textAlign: 'left' }}>
                  {t('welcome_message') || 'Welcome!'}
                </Heading>
                <Text style={{ color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                  {t('home_subtitle') || 'Explore the features.'}
                </Text>
              </View>

              <Box style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 24, padding: 24 }}>
                <Heading size="lg" style={{ color: 'white', textAlign: 'center', marginBottom: 16 }}>
                  {t('app_title')}
                </Heading>
                <AppButton title="Reset Onboarding" onPress={handleResetOnboarding} />
              </Box>
            </Box>
          </ScrollView>

          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 56 + insets.bottom,
              width: '100%',
              alignItems: 'center',
              zIndex: 10,
            }}
            pointerEvents="box-none"
          >
            <FloatingActionButton
              onPress={() => navigation.navigate('ScreenPicker')}
              label={t('add_item_button')}
            />
          </View>
        </View>
      </AppScreen>

      {/* Modal path retired in favor of ScreenPicker route for stability */}
    </React.Fragment>
  );
};

export default HomeScreen;
