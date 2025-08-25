import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTranslation } from 'react-i18next';
import AppBottomSheet from './AppBottomSheet';
import {
  ActionsheetItem,
  ActionsheetItemText,
  Button,
  ButtonText,
  Text,
} from '@gluestack-ui/themed';

interface Props {
  visible: boolean;
  onClose: () => void;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const ScreenSelectionModal: React.FC<Props> = ({ visible, onClose, navigation }) => {
  const { t } = useTranslation();

  const handleNavigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
    onClose();
  };

  return (
    <AppBottomSheet isOpen={visible} onClose={onClose}>
      <Text className="text-center text-lg font-semibold mb-2">
        {t('screen_selection_title')}
      </Text>
      <ActionsheetItem onPress={() => handleNavigate('List')} className="justify-center">
        <ActionsheetItemText className="text-center">
          {t('list_card_title')}
        </ActionsheetItemText>
      </ActionsheetItem>
      <ActionsheetItem onPress={() => handleNavigate('Settings')} className="justify-center">
        <ActionsheetItemText className="text-center">
          {t('settings_title')}
        </ActionsheetItemText>
      </ActionsheetItem>
      <Button variant="outline" className="mt-2" onPress={onClose}>
        <ButtonText>{t('close')}</ButtonText>
      </Button>
    </AppBottomSheet>
  );
};

export default ScreenSelectionModal;
