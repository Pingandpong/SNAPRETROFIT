import React from 'react';
import { Pressable } from 'react-native';
import { HStack, VStack, Text, Box, Image } from '@gluestack-ui/themed';
import { Feather } from '@expo/vector-icons';

export type FeatherIconName = keyof typeof Feather.glyphMap;

interface ListItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  leftIcon?: FeatherIconName;
  avatarUri?: string;
  rightElement?: React.ReactNode;
  className?: string;
}

// 목록 행 아이템: 아이콘/아바타 + 제목/부제목 + 화살표
const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  onPress,
  leftIcon,
  avatarUri,
  rightElement,
  className,
}) => {
  return (
    <Pressable onPress={onPress} accessibilityRole={onPress ? 'button' : undefined}>
      <HStack className={`items-center justify-between py-3 px-2 ${className || ''}`}>
        <HStack className="items-center space-x-3">
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              alt={title}
              className="w-10 h-10 rounded-full"
            />
          ) : leftIcon ? (
            <Box className="w-10 h-10 rounded-full items-center justify-center bg-black/5 dark:bg-white/10">
              <Feather name={leftIcon} size={18} color="#64748b" />
            </Box>
          ) : null}
          <VStack>
            <Text className="text-base font-medium">{title}</Text>
            {subtitle ? (
              <Text className="text-xs text-typography-500 mt-0.5">{subtitle}</Text>
            ) : null}
          </VStack>
        </HStack>
        {rightElement ?? <Feather name="chevron-right" size={18} color="#94a3b8" />}
      </HStack>
    </Pressable>
  );
};

export default ListItem;
