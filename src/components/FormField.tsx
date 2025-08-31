import React from 'react';
import { VStack, Text, HStack } from '@gluestack-ui/themed';

interface FormFieldProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  children: React.ReactNode;
}

// 라벨/도움말/에러 표준 래퍼. 내부에 AppInput 등 배치
const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  helperText,
  errorText,
  children,
}) => {
  const showHelper = !!helperText && !errorText;
  return (
    <VStack className="mb-4">
      {label ? (
        <HStack className="items-baseline mb-2">
          <Text className="text-sm text-typography-700 font-medium">{label}</Text>
          {required ? <Text className="ml-1 text-error-600">*</Text> : null}
        </HStack>
      ) : null}
      {children}
      {errorText ? (
        <Text className="mt-1 text-error-600 text-xs">{errorText}</Text>
      ) : showHelper ? (
        <Text className="mt-1 text-typography-500 text-xs">{helperText}</Text>
      ) : null}
    </VStack>
  );
};

export default FormField;

