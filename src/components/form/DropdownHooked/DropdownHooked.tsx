import React, {useCallback, useState} from 'react';
import DropDown, {DropDownPropsInterface} from 'react-native-paper-dropdown';
import {Control, useController} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import {FieldWrapper, InputWrapperProps} from '../FieldWrapper/FieldWrapper';
import {useAppTheme} from '../../../layout/theme';

export type DropdownHookedProps = Omit<
  DropDownPropsInterface,
  'visible' | 'onDismiss' | 'showDropDown' | 'value' | 'setValue'
> &
  Pick<InputWrapperProps, 'bottomSpace'> & {
    name: string;
    control: Control<any>;
    disabled?: boolean;
  };

export const DropdownHooked = ({
  name,
  control,
  bottomSpace,
  disabled = false,
  ...props
}: DropdownHookedProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const {field, fieldState} = useController({
    control,
    name,
  });
  const theme = useAppTheme();
  const showDropdown = useCallback(() => setIsVisible(true), []);
  const hideDropdown = useCallback(() => setIsVisible(false), []);

  return (
    <FieldWrapper bottomSpace={bottomSpace} error={fieldState.error?.message}>
      <DropDown
        visible={isVisible}
        onDismiss={hideDropdown}
        showDropDown={showDropdown}
        value={field.value}
        setValue={newValue => field.onChange(newValue)}
        mode="outlined"
        theme={theme}
        inputProps={{
          error: !!fieldState.error,
          right: (
            <TextInput.Icon
              icon={isVisible ? 'chevron-up' : 'chevron-down'}
              size={24}
            />
          ),
          disabled,
        }}
        {...props}
      />
    </FieldWrapper>
  );
};
