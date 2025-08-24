import React from 'react';
import { Input, InputField, Text } from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<typeof InputField> {
  errorText?: string;
}

const AppInput: React.FC<Props> = ({ errorText, ...props }) => {
  return (
    <>
      <Input className="mb-2">
        <InputField {...props} />
      </Input>
      {errorText ? <Text className="text-error-600 text-sm">{errorText}</Text> : null}
    </>
  );
};

export default AppInput;
