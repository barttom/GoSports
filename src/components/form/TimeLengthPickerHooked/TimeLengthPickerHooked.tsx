import React, {useEffect, useMemo, useState} from 'react';
import ScrollPicker, {
  ScrollPickerProps,
} from 'react-native-wheel-scrollview-picker';
import {Control, useController} from 'react-hook-form';
import {Text} from 'react-native-paper';
import {View} from 'react-native';
import {FieldWrapper, InputWrapperProps} from '../FieldWrapper/FieldWrapper';
import {useMakeStyles} from '../../../hooks/useMakeStyles';

export type TimeLengthPickerHookedProps = Pick<
  InputWrapperProps,
  'bottomSpace'
> & {
  name: string;
  control: Control<any>;
  withErrorMessage?: boolean;
  defaultValue?: number;
  label?: string;
};

const timeNumbers = Array.from({length: 60}, (_, index) =>
  index < 10 ? `0${index}` : index.toString(),
);
const parseDefaultValue = (value: number | string) => {
  const parsedValue = Number(value);

  if (isNaN(parsedValue) || parsedValue <= 0) {
    return {
      minutes: 0,
      seconds: 0,
    };
  }
  const basedTime = 60;
  const seconds = parsedValue % basedTime;
  const minutes =
    parsedValue >= basedTime ? (parsedValue - seconds) / basedTime : 0;

  return {
    minutes,
    seconds,
  };
};

export const TimeLengthPickerHooked = ({
  control,
  name,
  bottomSpace,
  withErrorMessage = true,
  defaultValue = 0,
  label,
}: TimeLengthPickerHookedProps) => {
  const initialIndex = useMemo(
    () => parseDefaultValue(defaultValue),
    [defaultValue],
  );
  const [minutesIndex, setMinutesIndex] = useState(initialIndex.minutes);
  const [secondsIndex, setSecondsIndex] = useState(initialIndex.seconds);
  const {field, fieldState} = useController({
    control,
    name,
  });
  const {styles, theme} = useMakeStyles(({layout, colors}) => ({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: layout.gap,
    },
    label: {
      paddingRight: 4,
      paddingLeft: 2,
    },
    picker: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 128,
    },
    mainLabel: {
      color: colors.onBackground,
      marginRight: layout.gap,
    },
  }));
  const pickerProps: Partial<ScrollPickerProps> = {
    wrapperHeight: 50,
    wrapperColor: theme.colors.background,
    highlightColor: theme.colors.outline,
    highlightBorderWidth: 1,
    itemHeight: 40,
    renderItem: data => <Text>{data}</Text>,
  };

  useEffect(() => {
    const minutes = Number(timeNumbers[minutesIndex]);
    const seconds = Number(timeNumbers[secondsIndex]);

    field.onChange(minutes * 60 + seconds);
  }, [minutesIndex, secondsIndex]);

  return (
    <FieldWrapper
      bottomSpace={bottomSpace}
      error={withErrorMessage ? fieldState.error?.message : undefined}>
      <View style={styles.wrapper}>
        {label && <Text style={styles.mainLabel}>{label}</Text>}
        <View style={styles.picker}>
          <ScrollPicker
            dataSource={timeNumbers}
            {...pickerProps}
            onValueChange={(data, selectedIndex) => {
              setMinutesIndex(selectedIndex);
            }}
            selectedIndex={minutesIndex}
          />
          <Text style={styles.label}>min.</Text>
        </View>
        <View style={styles.picker}>
          <ScrollPicker
            dataSource={timeNumbers}
            {...pickerProps}
            onValueChange={(data, selectedIndex) => {
              setSecondsIndex(selectedIndex);
            }}
            selectedIndex={secondsIndex}
          />
          <Text style={styles.label}>sec.</Text>
        </View>
      </View>
    </FieldWrapper>
  );
};