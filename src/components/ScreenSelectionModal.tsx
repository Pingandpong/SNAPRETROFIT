import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../navigation/types';
import { useTranslation } from 'react-i18next';

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
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(300);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(onClose);
  };

  const handleNavigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
    handleClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }] }>
        <Text style={styles.title}>{t('screen_selection_title')}</Text>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigate('List')}>
          <Text style={styles.buttonText}>{t('list_card_title')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigate('Settings')}>
          <Text style={styles.buttonText}>{t('settings_title')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeText}>{t('close')}</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 8,
    paddingVertical: 12,
  },
  closeText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
});

export default ScreenSelectionModal;
