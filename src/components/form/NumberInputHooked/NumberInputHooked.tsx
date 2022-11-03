import React, {useCallback} from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';
import {Control, useController} from 'react-hook-form';
import {useAppTheme} from '../../../layout/theme';
import {FieldWrapper, InputWrapperProps} from '../FieldWrapper/FieldWrapper';

export type NumberInputHookedProps = Omit<TextInputProps, 'theme'> &
  Pick<InputWrapperProps, 'bottomSpace'> & {
    name: string;
    control: Control<any>;
    withErrorMessage?: boolean;
    allowDecimals?: boolean;
  };

const numberIntRegex = /^(\s*|\d+)$/;
const numberDecimalRegex = /^(\s|\d*\.?\d*)$/;

export const NumberInputHooked = ({
  name,
  defaultValue,
  control,
  bottomSpace,
  withErrorMessage = true,
  allowDecimals = false,
  ...props
}: NumberInputHookedProps) => {
  const {field, fieldState} = useController({
    control,
    name,
    defaultValue,
  });
  const theme = useAppTheme();
  const handleChange = useCallback(
    (newValue: string) => {
      const numberRegex = allowDecimals ? numberDecimalRegex : numberIntRegex;

      if (numberRegex.test(newValue)) {
        field.onChange(newValue);
      }
    },
    [field.onChange, allowDecimals],
  );

  return (
    <FieldWrapper
      bottomSpace={bottomSpace}
      error={withErrorMessage ? fieldState.error?.message : undefined}>
      <TextInput
        onChangeText={handleChange}
        keyboardType="numeric"
        value={field.value}
        defaultValue={defaultValue}
        mode="outlined"
        error={!!fieldState.error}
        theme={{
          colors: {
            ...theme.colors,
          },
        }}
        {...props}
      />
    </FieldWrapper>
  );
};
