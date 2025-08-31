import React from 'react';
import { SafeAreaView, ScrollView, View, ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { appTheme } from '../theme/gluestack-ui.theme';
import { useTheme } from '../context/ThemeContext';

interface AppScreenProps extends Omit<ViewProps, 'style'> {
  children: React.ReactNode;
  scroll?: boolean;
  contentClassName?: string;
  variant?: 'gradient' | 'solid';
  gradientColors?: [string, string];
}

// 화면 전역 컨테이너: SafeArea + 글로벌 패딩 + 테마 배경
const AppScreen: React.FC<AppScreenProps> = ({
  children,
  scroll = false,
  className,
  contentClassName,
  ...rest
}) => {
  const { colorMode } = useTheme();
  const bgColor =
    colorMode === 'dark'
      ? appTheme.tokens.colors.backgroundDark
      : appTheme.tokens.colors.backgroundLight;

  // 기본은 HomeScreen과 동일한 그라디언트
  const effectiveVariant = (rest as any).variant ?? 'gradient';
  const colors = (rest as any).gradientColors ?? ['#0b0e23', '#151929'];

  const Container = scroll ? ScrollView : View;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: effectiveVariant === 'gradient' ? colors[0] : bgColor }}>
      {effectiveVariant === 'gradient' ? (
        <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
          <Container
            className={`flex-1 px-6 py-4 ${className || ''}`}
            contentContainerStyle={scroll ? { paddingBottom: 24 } : undefined}
            {...(rest as any)}
          >
            <View className={`flex-1 ${contentClassName || ''}`}>{children}</View>
          </Container>
        </LinearGradient>
      ) : (
        <Container
          className={`flex-1 px-6 py-4 ${className || ''}`}
          contentContainerStyle={scroll ? { paddingBottom: 24 } : undefined}
          {...(rest as any)}
        >
          <View className={`flex-1 ${contentClassName || ''}`}>{children}</View>
        </Container>
      )}
    </SafeAreaView>
  );
};

export default AppScreen;
