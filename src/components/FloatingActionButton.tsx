import React from 'react';
import { Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { appTheme } from '../theme/gluestack-ui.theme';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface Props {
  onPress: () => void;
  label: string;
}

const SIZE = 64;

const FloatingActionButton: React.FC<Props> = ({ onPress, label }) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const handleIn = () => { scale.value = withSpring(0.95, { mass: 0.5, damping: 15, stiffness: 200 }); };
  const handleOut = () => { scale.value = withSpring(1, { mass: 0.5, damping: 12, stiffness: 180 }); };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={handleIn}
        onPressOut={handleOut}
        accessibilityRole="button"
        accessibilityLabel={label}
        hitSlop={10}
        style={{
          width: SIZE,
          height: SIZE,
          borderRadius: SIZE / 2,
          backgroundColor: appTheme.tokens.colors.primary500,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
          elevation: 4,
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Feather name="plus" size={28} color="#fff" />
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default FloatingActionButton;
