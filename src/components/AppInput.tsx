import React, { useState } from 'react';
import { Input, InputField, Text } from '@gluestack-ui/themed';
import { ComponentProps } from 'react';
import { Feather } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

interface Props extends ComponentProps<typeof InputField> {
  errorText?: string;
  leadingIcon?: keyof typeof Feather.glyphMap;
  trailingIcon?: keyof typeof Feather.glyphMap;
  type?: 'text' | 'password';
}

const AppInput: React.FC<Props> = ({ errorText, leadingIcon, trailingIcon, type = 'text', ...props }) => {
  const [secure, setSecure] = useState(type === 'password');
  const showToggle = type === 'password';

  return (
    <View>
      <Input className={`mb-1 ${errorText ? 'border border-error-600' : ''}`}>
        {leadingIcon ? (
          <View className="pl-3 pr-2 justify-center">
            <Feather name={leadingIcon} size={16} color="#94a3b8" />
          </View>
        ) : null}
        <InputField secureTextEntry={secure} {...props} />
        {showToggle ? (
          <Pressable onPress={() => setSecure(v => !v)} accessibilityRole="button" className="px-3 justify-center">
            <Feather name={secure ? 'eye' : 'eye-off'} size={16} color="#94a3b8" />
          </Pressable>
        ) : trailingIcon ? (
          <View className="pl-2 pr-3 justify-center">
            <Feather name={trailingIcon} size={16} color="#94a3b8" />
          </View>
        ) : null}
      </Input>
      {errorText ? <Text className="text-error-600 text-xs">{errorText}</Text> : null}
    </View>
  );
};

export default AppInput;
