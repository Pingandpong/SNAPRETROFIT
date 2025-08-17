import { config as defaultConfig } from '@gluestack-ui/config';
import { createConfig } from '@gluestack-ui/themed';

// A more professional and modern color palette
const colors = {
  // Primary/Accent Colors (for icons/buttons)
  primary500: '#6A5ACD', // A soft purple
  secondary500: '#8A2BE2', // A brighter purple

  // Light Mode Palette (Neumorphism - conceptual, as image is dark)
  backgroundLight: '#E0E5EC', // Light gray for neumorphism background
  cardLight: '#E0E5EC', // Same as background for soft effect
  textLight: '#2D3748', // Dark gray text
  borderLight: '#C8D0D8', // Lighter border for soft effect
  cardHoverLight: '#D1D9E6', // Slightly darker for hover

  // Dark Mode Palette (Neumorphism - extracted from image)
  backgroundDark: '#1A1520', // Dark purple background
  cardDark: '#211A30', // Slightly lighter dark purple for cards
  textDark: '#FFFFFF', // Light gray text
  borderDark: '#3A304D', // Darker border for soft effect
  cardHoverDark: '#3A304D', // Slightly lighter for hover
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
