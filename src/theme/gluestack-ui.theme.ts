import { config as defaultConfig } from '@gluestack-ui/config';
import { createConfig } from '@gluestack-ui/themed';

// Extend the default config with our custom colors
export const appTheme = createConfig({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      // Add or override our custom colors
      backgroundLight: '#ffffff',
      textLight: '#1a1a1a',
      cardLight: '#f5f5f5',
      borderLight: '#e5e5e5',

      backgroundDark: '#1a1a1a',
      textDark: '#ffffff',
      cardDark: '#2a2a2a',
      borderDark: '#3a3a3a',
    },
  },
});
