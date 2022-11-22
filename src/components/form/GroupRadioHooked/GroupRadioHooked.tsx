import React from 'react';
import {RadioButton, RadioButtonItemProps} from 'react-native-paper';
import {Control, useController} from 'react-hook-form';
import {FieldWrapper, InputWrapperProps} from '../FieldWrapper/FieldWrapper';

export type GroupRadioHookedProps = Omit<
  RadioButtonItemProps,
  'label' | 'value' | 'theme'
> &
  Pick<InputWrapperProps, 'bottomSpace'> & {
    name: string;
    control: Control<any>;
    withErrorMessage?: boolean;
    items: Array<{
      label: string;
      value: string;
    }>;
  };

export const GroupRadioHooked = ({
  bottomSpace,
  withErrorMessage = true,
  name,
  control,
  items,
  ...props
}: GroupRadioHookedProps) => {
  const {field, fieldState} = useController({
    control,
    name,
  });
  return (
    <FieldWrapper
      bottomSpace={bottomSpace}
      error={withErrorMessage ? fieldState.error?.message : undefined}>
      <RadioButton.Group
        value={field.value}
        onValueChange={newValue => field.onChange(newValue)}>
        {items.map(({label, value}) => (
          <RadioButton.Item
            key={value}
            label={label}
            value={value}
            {...props}
          />
        ))}
      </RadioButton.Group>
    </FieldWrapper>
  );
};
