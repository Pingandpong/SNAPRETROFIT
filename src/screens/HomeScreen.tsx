import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, Heading, useToken } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import ScreenSelectionModal from '../components/ScreenSelectionModal';
import FloatingActionButton from '../components/FloatingActionButton';
import { useTranslation } from 'react-i18next';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [start, end] = useToken('colors', ['homeBgStart', 'homeBgEnd']);

  return (
    <LinearGradient colors={[start, end]} className="flex-1">
      <SafeAreaView className="flex-1">
        <Box className="flex-1 justify-center p-6">
          <Box className="bg-white/5 rounded-3xl p-6 shadow-soft-3">
            <Heading size="lg" className="text-white text-center mb-4">
              {t('app_title')}
            </Heading>
          </Box>
          <Box className="absolute bottom-6 left-0 right-0 items-center">
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
        </Box>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;
