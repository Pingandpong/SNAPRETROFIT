import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { appTheme } from '../theme/gluestack-ui.theme';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';

type Props = NativeStackScreenProps<RootStackParamList, 'ScreenPicker'>;

const ScreenPickerScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();

  const menu = [
    { icon: 'credit-card', title: t('payment_card_title'), desc: t('payment_card_description'), navigateTo: 'Payment' as const },
    { icon: 'settings', title: t('settings_title'), desc: t('settings_card_description'), navigateTo: 'Settings' as const },
    { icon: 'list', title: t('list_card_title'), desc: t('list_card_description'), navigateTo: 'List' as const },
    { icon: 'wifi-off', title: t('status_examples_title'), desc: t('status_examples_description'), navigateTo: 'Status' as const },
    { icon: 'edit', title: t('create_edit_card_title'), desc: t('create_edit_card_description'), navigateTo: 'CreateEdit' as const },
    { icon: 'user', title: t('profile_card_title'), desc: t('profile_card_description'), navigateTo: 'Profile' as const },
  ] as const;

  const cardDark = appTheme.tokens.colors.cardDark;
  const backdrop = useSharedValue(0);
  const scale = useSharedValue(0.96);

  useEffect(() => {
    backdrop.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.ease) });
    scale.value = withTiming(1, { duration: 220, easing: Easing.out(Easing.ease) });
  }, []);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: backdrop.value }));
  const cardStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <View style={styles.overlayRoot}>
      <Animated.View style={[styles.backdrop, backdropStyle]} />
      <Pressable style={StyleSheet.absoluteFill} onPress={() => navigation.goBack()} />
      <Animated.View style={[styles.card, { backgroundColor: cardDark }, cardStyle]}>
        {menu.map(item => (
          <TouchableOpacity key={item.title as string} style={styles.row} onPress={() => navigation.navigate(item.navigateTo as any)}>
            <LinearGradient colors={['#7d5cff', '#5d3aff']} style={styles.iconBox}>
              <Feather name={item.icon} size={24} color="#fff" />
            </LinearGradient>
            <View style={styles.textWrap}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowDesc}>{item.desc}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#ffffff" />
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject as any,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  card: {
    width: '90%',
    maxWidth: 420,
    borderRadius: 24,
    padding: 24,
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
  textWrap: { flex: 1 },
  rowTitle: { color: '#ffffff', fontSize: 16, fontWeight: '500' },
  rowDesc: { color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 4 },
});

export default ScreenPickerScreen;
