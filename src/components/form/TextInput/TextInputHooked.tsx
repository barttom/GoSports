import React from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';
import {Control, useController} from 'react-hook-form';
import {useAppTheme} from '../../../layout/theme';
import {FieldWrapper, InputWrapperProps} from '../FieldWrapper/FieldWrapper';

export type TextInputHookedProps = Omit<TextInputProps, 'theme'> &
  Pick<InputWrapperProps, 'bottomSpace'> & {
    name: string;
    control: Control<any>;
  };

export const TextInputHooked = ({
  name,
  defaultValue,
  control,
  bottomSpace,
  ...props
}: TextInputHookedProps) => {
  const {field, fieldState} = useController({
    control,
    name,
    defaultValue,
  });
  const theme = useAppTheme();

  return (
    <FieldWrapper bottomSpace={bottomSpace} error={fieldState?.error?.message}>
      <TextInput
        onChangeText={field.onChange}
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
