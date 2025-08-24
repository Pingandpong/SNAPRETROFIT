import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ViewProps } from 'react-native';

const AnimatedCard: React.FC<ViewProps> = ({ children, ...props }) => (
  <Animated.View entering={FadeIn} exiting={FadeOut} {...props}>
    {children}
  </Animated.View>
);

export default AnimatedCard;
