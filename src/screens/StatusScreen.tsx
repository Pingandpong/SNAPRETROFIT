import React, { useState } from 'react';
import AppScreen from '../components/AppScreen';
import AppHeader from '../components/AppHeader';
import SectionHeader from '../components/SectionHeader';
import StateView from '../components/StateView';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import AppButton from '../components/AppButton';

const StatusScreen = () => {
  const { t } = useTranslation();
  const [retryCount, setRetryCount] = useState(0);

  return (
    <AppScreen>
      <AppHeader title={t('status_examples_title')} tone="dark" />

      <SectionHeader title={t('empty_title')} tone="dark" />
      <StateView
        variant="empty"
        title={t('empty_title')}
        message={t('empty_message')}
        actionLabel={t('browse')}
        onActionPress={() => {}}
        tone="dark"
      />

      <SectionHeader title={t('offline_title')} tone="dark" />
      <StateView
        variant="offline"
        title={t('offline_title')}
        message={t('offline_message')}
        actionLabel={t('retry')}
        onActionPress={() => setRetryCount((c) => c + 1)}
        tone="dark"
      />

      <SectionHeader title={t('error_title')} tone="dark" />
      <StateView
        variant="error"
        title={t('error_title')}
        message={t('error_message')}
        actionLabel={t('retry')}
        onActionPress={() => setRetryCount((c) => c + 1)}
        tone="dark"
      />
    </AppScreen>
  );
};

export default StatusScreen;
