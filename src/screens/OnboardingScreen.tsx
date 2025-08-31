import React, { useRef, useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import AppButton from '../components/AppButton';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle } from 'react-native-reanimated';

interface Props {
  onFinish: () => void;
}

const { width } = Dimensions.get('window');

const OnboardingScreen: React.FC<Props> = ({ onFinish }) => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList>(null);
  // micro animations (Reanimated)
  const current = useSharedValue(0);
  const btnScale = useSharedValue(1);

  useEffect(() => {
    current.value = withTiming(index, { duration: 200, easing: Easing.out(Easing.ease) });
    btnScale.value = 0.97;
    btnScale.value = withTiming(1, { duration: 180, easing: Easing.out(Easing.ease) });
  }, [index, current, btnScale]);

  // Dot item component (hooks must not be inside loops/callbacks)
  const DotItem = ({ i }: { i: number }) => {
    const style = useAnimatedStyle(() => {
      const dist = Math.abs(current.value - i);
      const clamp = (v: number) => Math.max(0, Math.min(1, v));
      const f = clamp(1 - dist); // 1 when active, 0 when far
      const scale = 1 + 0.25 * f;
      const opacity = 0.35 + 0.65 * f;
      return { transform: [{ scale }], opacity };
    });
    return (
      <Animated.View style={[styles.dot, i === index ? styles.dotActive : styles.dotInactive, style]} />
    );
  };

  // Button area animation style (defined at component scope to satisfy hooks rule)
  const btnAnimatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: btnScale.value }] }));

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
            {/* Progress dots */}
            <View style={styles.dots}>
              {slides.map((s, i) => (
                <DotItem i={i} key={s.key} />
              ))}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Animated.View style={[styles.buttonWrapper, btnAnimatedStyle]}>
              <AppButton title={index === slides.length - 1 ? t('start_app') : t('next')} onPress={handleNext} />
              <AppButton
                title={t('skip')}
                variant="link"
                onPress={onFinish}
                style={{ marginTop: 16, opacity: index < slides.length - 1 ? 1 : 0 }}
                disabled={index === slides.length - 1}
              />
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
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
    paddingBottom:110,
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
    width: 300,
    height: 300,
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
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#ffffff',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  buttonWrapper: {
      width: '100%',
      maxWidth: 320,
  },
});

export default OnboardingScreen;
