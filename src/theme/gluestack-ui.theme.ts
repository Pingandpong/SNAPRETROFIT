import { config as defaultConfig } from '@gluestack-ui/config';
import { createConfig } from '@gluestack-ui/themed';

// 샘플 이미지를 참고하여 재정의한 컬러 팔레트
const colors = {
  // Primary/Accent Colors
  primary500: '#4F46E5', // 인디고 계열 기본 색
  secondary500: '#EC4899', // 포인트용 핑크 색
  heroStart: '#6366F1', // 히어로 배너 그라디언트 시작
  heroEnd: '#EC4899', // 히어로 배너 그라디언트 끝
  cardGradientStart: '#4F46E5', // 카드 그라디언트 시작
  cardGradientEnd: '#EC4899', // 카드 그라디언트 끝
  homeBgStart: '#EEF2FF', // 홈 화면 배경 그라디언트 시작
  homeBgEnd: '#FDF2F8', // 홈 화면 배경 그라디언트 끝

  // Light Mode Palette
  backgroundLight: '#F9FAFB', // 밝은 회색 배경
  cardLight: '#FFFFFF', // 카드 기본색
  textLight: '#1E293B', // 진한 회색 텍스트
  borderLight: '#E5E7EB', // 연한 테두리색
  cardHoverLight: '#F3F4F6', // 호버 시 약간 진한 배경

  // Dark Mode Palette
  backgroundDark: '#111827', // 다크 모드 배경
  cardDark: '#1F2937', // 다크 모드 카드색
  textDark: '#F9FAFB', // 어둠 텍스트
  borderDark: '#374151', // 다크 모드 테두리
  cardHoverDark: '#4B5563', // 호버 시 배경
};

export const appTheme = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      ...colors,
    },
    fonts: {
      ...defaultConfig.tokens.fonts,
      heading: 'Poppins_500Medium',
      body: 'Poppins_400Regular',
      mono: 'Roboto_400Regular',
    },
    space: {
      ...defaultConfig.tokens.space,
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    fontSizes: {
      ...defaultConfig.tokens.fontSizes,
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
    },
    lineHeights: {
      ...defaultConfig.tokens.lineHeights,
      xs: 18,
      sm: 20,
      md: 22,
      lg: 24,
      xl: 28,
      '2xl': 32,
      '3xl': 38,
    },
  },
  // Overriding aliases for easier use
  aliases: {
    ...defaultConfig.aliases,
    // Spacing
    p: 'padding',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
    m: 'margin',
    mx: 'marginHorizontal',
    my: 'marginVertical',
    // Colors
    bg: 'backgroundColor',
  },
});

export type AppTheme = typeof appTheme;

declare module '@gluestack-ui/themed' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ConfigType extends AppTheme {}
}

