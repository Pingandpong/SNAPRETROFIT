import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../navigation/types';
import { useTranslation } from 'react-i18next';
import { appTheme } from '../theme/gluestack-ui.theme';
// NOTE: animations removed for stability

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
    {icon: 'wifi-off', title: t('status_examples_title'), desc: t('status_examples_description'), navigateTo: 'Status' as const},
    {icon: 'edit', title: t('create_edit_card_title'), desc: t('create_edit_card_description'), navigateTo: 'CreateEdit' as const},
    {icon: 'user', title: t('profile_card_title'), desc: t('profile_card_description'), navigateTo: 'Profile' as const},
  ] as const;

  const handleNavigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen as never);
    onClose();
  };

  const cardDark = appTheme.tokens.colors.cardDark;
  const textMuted = 'rgba(255,255,255,0.75)';

  // no animation state

  return (
    <Modal
      animationType="none"
      transparent={false}
      presentationStyle="fullScreen"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <SafeAreaView style={styles.safe}>
          <View style={[styles.card, { backgroundColor: cardDark }]}>
              <Text style={[styles.cardTitle, { color: '#ffffff' }]}>{t('screen_selection_title')}</Text>

              {menu.map(item => (
                <TouchableOpacity key={item.title} style={styles.row} onPress={() => handleNavigate(item.navigateTo)}>
                  <LinearGradient
                    colors={['#7d5cff', '#5d3aff']}
                    style={styles.iconBox}>
                    <Feather name={item.icon} size={24} color="#fff" />
                  </LinearGradient>

                  <View style={styles.textWrap}>
                    <Text style={[styles.rowTitle, { color: '#ffffff' }]}>{item.title}</Text>
                    <Text style={[styles.rowDesc, { color: textMuted }]}>{item.desc}</Text>
                  </View>

                  <Feather name="chevron-right" size={20} color="#ffffff" />
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel={t('close')}
                onPress={onClose}
              >
                <Feather name="x" size={28} color="#ffffff" />
              </TouchableOpacity>
            </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safe: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    maxWidth: 420,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 16,
    elevation: 8,
    zIndex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
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
  closeButton: {
    alignSelf: 'center',
    marginTop: 12,
  },
});

export default ScreenSelectionModal;
