import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import AppButton from '../components/AppButton';
import { useTranslation } from 'react-i18next';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { appTheme } from '../theme/gluestack-ui.theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeProvider } from '../context/ThemeContext';

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
    <ThemeProvider>
      <GluestackUIProvider config={appTheme} colorMode="light">
        <LinearGradient colors={['#0b0e23', '#151929']} style={styles.gradient}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
              <View style={styles.contentContainer}>
                <FlatList
                  data={slides}
                  horizontal
                  pagingEnabled
                  ref={ref}
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={e => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
                  renderItem={({ item }) => (
                    <View style={styles.slide}>
                      <LottieView
                        source={item.animation}
                        autoPlay
                        loop
                        style={styles.lottie}
                      />
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.description}>{item.desc}</Text>
                    </View>
                  )}
                  keyExtractor={item => item.key}
                />
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <AppButton title={index === slides.length - 1 ? t('start_app') : t('next')} onPress={handleNext} />
                    <AppButton
                        title={t('skip')}
                        variant="link"
                        onPress={onFinish}
                        style={{
                            marginTop: 16,
                            opacity: index < slides.length - 1 ? 1 : 0,
                        }}
                        disabled={index === slides.length - 1}
                    />
                </View>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </GluestackUIProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: width - 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 280,
    height: 280,
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#FFFFFF',
  },
  description: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonWrapper: {
      width: '100%',
      maxWidth: 320,
  }
});

export default OnboardingScreen;
