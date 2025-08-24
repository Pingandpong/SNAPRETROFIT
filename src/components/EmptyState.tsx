import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '@gluestack-ui/themed';

interface Props {
  icon?: ReactNode;
  message: string;
}

const EmptyState: React.FC<Props> = ({ icon, message }) => (
  <View className="flex-1 items-center justify-center p-4">
    {icon}
    <Text className="mt-4 text-center text-typography-500">{message}</Text>
  </View>
);

export default EmptyState;
