import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../navigation/types';
import { useTranslation } from 'react-i18next';
import { commonStyles } from '../styles/commonStyles';
import { appTheme } from '../theme/gluestack-ui.theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface Props {
  visible: boolean;
  onClose: () => void;
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >;
}

const ScreenSelectionModal: React.FC<Props> = ({ visible, onClose, navigation }) => {
  const { t } = useTranslation();

  const menu = [
    {icon: 'credit-card', title: t('payment_card_title'), desc: t('payment_card_description'), navigateTo: 'Payment' as const},
    {icon: 'settings', title: t('settings_title'), desc: t('settings_card_description'), navigateTo: 'Settings' as const},
    {icon: 'list', title: t('list_card_title'), desc: t('list_card_description'), navigateTo: 'List' as const},
    {icon: 'edit', title: t('create_edit_card_title'), desc: t('create_edit_card_description'), navigateTo: 'CreateEdit' as const},
    {icon: 'user', title: t('profile_card_title'), desc: t('profile_card_description'), navigateTo: 'Profile' as const},
  ] as const;

  const handleNavigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as never);
    onClose();
  };

  const homeBgStart = appTheme.tokens.colors.homeBgStart;
  const homeBgEnd = appTheme.tokens.colors.homeBgEnd;
  const cardDark = appTheme.tokens.colors.cardDark;
  const textDark = appTheme.tokens.colors.textDark;
  const textMuted = 'rgba(255,255,255,0.7)';

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) });
      opacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) });
    } else {
      scale.value = withTiming(0, { duration: 400, easing: Easing.in(Easing.ease) });
      opacity.value = withTiming(0, { duration: 400, easing: Easing.in(Easing.ease) });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Modal
      animationType="none"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={[homeBgStart, homeBgEnd]}
          style={styles.container}>
          <SafeAreaView style={styles.safe}>
            <View style={[styles.card, { backgroundColor: cardDark }]}>
              <Text style={[styles.cardTitle, { color: textDark }]}>{t('app_title')}</Text>

              {menu.map(item => (
                <TouchableOpacity key={item.title} style={styles.row} onPress={() => handleNavigate(item.navigateTo)}>
                  <LinearGradient
                    colors={['#7d5cff', '#5d3aff']}
                    style={styles.iconBox}>
                    <Feather name={item.icon} size={24} color="#fff" />
                  </LinearGradient>

                  <View style={styles.textWrap}>
                    <Text style={[styles.rowTitle, { color: textDark }]}>{item.title}</Text>
                    <Text style={[styles.rowDesc, { color: textMuted }]}>{item.desc}</Text>
                  </View>

                  <Feather name="chevron-right" size={20} color={textDark} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.plusWrap}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={t('close')}
                onPress={onClose}
              >
                <LinearGradient
                  colors={['#7d5cff', '#5d3aff']}
                  style={styles.plusBtn}>
                  <Feather name="x" size={28} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
  container: {
    flex: 1,
  },
  safe: {
    ...commonStyles.safe,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 16,
  },
  cardTitle: {
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
  rowTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  rowDesc: {
    fontSize: 12,
    marginTop: 4
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

export default ScreenSelectionModal;