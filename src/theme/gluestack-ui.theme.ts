import { config as defaultConfig } from '@gluestack-ui/config';
import { createConfig } from '@gluestack-ui/themed';

// 새로운 샘플 이미지 스타일에 맞춘 컬러 팔레트
const colors = {
  // Primary/Accent Colors
  primary500: '#00BCD4', // 차분한 민트색
  secondary500: '#FFC107', // 포인트용 앰버색

  // Light Mode Palette
  backgroundLight: '#F0F4F8', // 밝은 회색 배경
  cardLight: '#FFFFFF', // 카드 기본색
  textLight: '#1F2937', // 진한 회색 텍스트
  borderLight: '#E2E8F0', // 연한 테두리색
  cardHoverLight: '#E2E8F0', // 호버 시 약간 진한 배경

  // Dark Mode Palette
  backgroundDark: '#0F172A', // 어두운 남색 배경
  cardDark: '#1E293B', // 다크 모드 카드색
  textDark: '#F8FAFC', // 연한 텍스트
  borderDark: '#334155', // 다크 모드 테두리
  cardHoverDark: '#334155', // 호버 시 배경
};

export const appTheme = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      ...colors,
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
