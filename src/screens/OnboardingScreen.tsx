import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import AppButton from '../components/AppButton';
import { useTranslation } from 'react-i18next';

interface Props {
  onFinish: () => void;
}

const { width } = Dimensions.get('window');

const OnboardingScreen: React.FC<Props> = ({ onFinish }) => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList>(null);

  const slides = [
    {
      key: '1',
      title: t('onboarding_title1'),
      desc: t('onboarding_desc1'),
      animation: require('../../assets/animations/onboarding1.json'),
    },
    {
      key: '2',
      title: t('onboarding_title2'),
      desc: t('onboarding_desc2'),
      animation: require('../../assets/animations/onboarding2.json'),
    },
  ];

  const handleNext = () => {
    if (index < slides.length - 1) {
      ref.current?.scrollToIndex({ index: index + 1 });
    } else {
      onFinish();
    }
  };

  return (
    <View className="flex-1 bg-background px-6 py-12">
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        ref={ref}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => (
          <View style={{ width }} className="items-center justify-center">
            <LottieView
              source={item.animation}
              autoPlay
              loop
              style={{ width: 200, height: 200 }}
            />
            <Text className="text-2xl font-bold text-center mb-4">{item.title}</Text>
            <Text className="text-center">{item.desc}</Text>
          </View>
        )}
        keyExtractor={item => item.key}
      />
      <View className="mt-auto">
        <AppButton title={index === slides.length - 1 ? t('start_app') : t('next')} onPress={handleNext} />
        {index < slides.length - 1 && (
          <AppButton
            title={t('skip')}
            variant="outline"
            className="mt-2"
            onPress={onFinish}
          />
        )}
      </View>
    </View>
  );
};

export default OnboardingScreen;
