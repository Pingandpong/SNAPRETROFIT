import React from 'react';
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

import { useTranslation } from 'react-i18next';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { t } = useTranslation();
  const menu = [
    {icon: 'credit-card', title: t('payment_card_title'), desc: t('payment_card_description'), navigateTo: 'Payment' as const},
    {icon: 'settings', title: t('settings_title'), desc: t('settings_card_description'), navigateTo: 'Settings' as const},
    {icon: 'list', title: t('list_card_title'), desc: t('list_card_description'), navigateTo: 'List' as const},
    {icon: 'edit', title: t('create_edit_card_title'), desc: t('create_edit_card_description'), navigateTo: 'CreateEdit' as const},
    {icon: 'user', title: t('profile_card_title'), desc: t('profile_card_description'), navigateTo: 'Profile' as const},
  ] as const;

  return (
    <LinearGradient
      colors={['#0b0e23', '#151929']}
      style={commonStyles.container}>
      <SafeAreaView style={styles.safe}>
        {/* 카드 영역 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('app_title')}</Text>

          {menu.map(item => (
            <TouchableOpacity key={item.title} style={styles.row} onPress={() => navigation.navigate(item.navigateTo)}>
              {/* 아이콘 박스 */}
              <LinearGradient
                colors={['#7d5cff', '#5d3aff']}
                style={styles.iconBox}>
                <Feather name={item.icon} size={24} color="#fff" />
              </LinearGradient>

              {/* 텍스트 */}
              <View style={styles.textWrap}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowDesc}>{item.desc}</Text>
              </View>

              {/* 오른쪽 화살표 */}
              <Feather name="chevron-right" size={20} color="#fff" />
            </TouchableOpacity>
          ))}
        </View>

        {/* 하단 플로팅 + 버튼 */}
        <View style={styles.plusWrap}>
          <LinearGradient
            colors={['#7d5cff', '#5d3aff']}
            style={styles.plusBtn}>
            <Feather name="plus" size={28} color="#fff" />
          </LinearGradient>
        </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textWrap: {flex: 1},
  rowTitle: {color: '#fff', fontSize: 16, fontWeight: '500'},
  rowDesc: {color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4},
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