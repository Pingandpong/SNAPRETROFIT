import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Feather} from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { commonStyles } from '../styles/commonStyles';
import ScreenSelectionModal from '../components/ScreenSelectionModal';

import { useTranslation } from 'react-i18next';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <LinearGradient
      colors={['#0b0e23', '#151929']}
      style={commonStyles.container}>
      <SafeAreaView style={styles.safe}>
        {/* 카드 영역 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('app_title')}</Text>
        </View>

        {/* 하단 플로팅 + 버튼 */}
        <View style={styles.plusWrap}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t('add_item_button')}
            onPress={() => setModalVisible(true)}
          >
            <LinearGradient
              colors={['#7d5cff', '#5d3aff']}
              style={styles.plusBtn}>
              <Feather name="plus" size={28} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <ScreenSelectionModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          navigation={navigation}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
  safe: {
    ...commonStyles.safe,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 16,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  plusWrap: {position: 'absolute', bottom: 24, left: 0, right: 0, alignItems: 'center'},
  plusBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7d5cff',
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
});

export default HomeScreen;