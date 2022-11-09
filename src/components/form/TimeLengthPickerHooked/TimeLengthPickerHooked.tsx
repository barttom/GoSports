import React, {useCallback, useEffect, useMemo, useState} from 'react';
import ScrollPicker, {
  ScrollPickerProps,
} from 'react-native-wheel-scrollview-picker';
import {Control, useController} from 'react-hook-form';
import {IconButton, Text} from 'react-native-paper';
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
  editable?: boolean;
};

const timeNumbers = Array.from({length: 60}, (_, index) =>
  index < 10 ? `0${index}` : index.toString(),
);

const convertSecondsToIndex = (
  value: number | string,
): {
  minutes: number;
  seconds: number;
} => {
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

const convertIndexToSeconds = (
  minutesIndex: number,
  secondsIndex: number,
): number => {
  const minutes = Number(timeNumbers[minutesIndex]);
  const seconds = Number(timeNumbers[secondsIndex]);

  return minutes * 60 + seconds;
};

export const TimeLengthPickerHooked = ({
  control,
  name,
  bottomSpace,
  withErrorMessage = true,
  defaultValue = 0,
  label,
  editable = true,
}: TimeLengthPickerHookedProps) => {
  const initialIndex = useMemo(
    () => convertSecondsToIndex(defaultValue),
    [defaultValue],
  );
  const [minutesIndex, setMinutesIndex] = useState(initialIndex.minutes);
  const [secondsIndex, setSecondsIndex] = useState(initialIndex.seconds);
  const [shouldRenderPicker, setShouldRenderPicker] = useState(true);
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
      justifySelf: 'flex-end',
    },
    picker: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 100,
      height: 50,
    },
    mainLabel: {
      color: colors.onBackground,
      marginRight: layout.gap,
    },
    pickerPlaceholder: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      borderTopColor: colors.outline,
      borderBottomColor: colors.outline,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderStyle: 'solid',
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
  const pickerPlaceholder = useMemo(
    () => (
      <View style={styles.pickerPlaceholder}>
        <Text>00</Text>
      </View>
    ),
    [],
  );
  const renderPicker = useCallback(
    ({
      selectedIndex,
      onValueChange,
    }: Pick<ScrollPickerProps, 'selectedIndex' | 'onValueChange'>) => {
      if (!editable) {
        return (
          <View style={styles.pickerPlaceholder}>
            <Text>{timeNumbers[selectedIndex!]}</Text>
          </View>
        );
      }

      if (shouldRenderPicker) {
        return (
          <ScrollPicker
            dataSource={timeNumbers}
            onValueChange={onValueChange}
            selectedIndex={selectedIndex}
            {...pickerProps}
          />
        );
      }

      return pickerPlaceholder;
    },
    [editable, styles.pickerPlaceholder, pickerProps, shouldRenderPicker],
  );

  const resetValue = useCallback(() => {
    setSecondsIndex(initialIndex.seconds);
    setMinutesIndex(initialIndex.minutes);
    setShouldRenderPicker(false);
    setTimeout(() => {
      setShouldRenderPicker(true);
    }, 0);
  }, [initialIndex]);

  useEffect(() => {
    field.onChange(convertIndexToSeconds(minutesIndex, secondsIndex));
  }, [minutesIndex, secondsIndex]);

  useEffect(() => {
    const currValue = Number(field.value);

    if (currValue !== convertIndexToSeconds(minutesIndex, secondsIndex)) {
      const parsedValue = convertSecondsToIndex(currValue);

      setMinutesIndex(parsedValue.minutes);
      setSecondsIndex(parsedValue.seconds);
    }
  }, [field.value]);

  return (
    <FieldWrapper
      bottomSpace={bottomSpace}
      error={withErrorMessage ? fieldState.error?.message : undefined}>
      <View style={styles.wrapper}>
        {label && <Text style={styles.mainLabel}>{label}</Text>}
        <View style={styles.picker}>
          {renderPicker({
            selectedIndex: minutesIndex,
            onValueChange: (data, selectedIndex) => {
              setMinutesIndex(selectedIndex);
            },
          })}
          <Text style={styles.label}>min.</Text>
        </View>
        <View style={styles.picker}>
          {renderPicker({
            selectedIndex: secondsIndex,
            onValueChange: (data, selectedIndex) => {
              setSecondsIndex(selectedIndex);
            },
          })}
          <Text style={styles.label}>sec.</Text>
        </View>
        {editable && (
          <IconButton
            icon="backspace-outline"
            size={24}
            onPress={resetValue}
            disabled={!secondsIndex && !minutesIndex}
          />
        )}
      </View>
    </FieldWrapper>
  );
};
