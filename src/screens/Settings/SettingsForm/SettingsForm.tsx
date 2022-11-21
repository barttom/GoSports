import React from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {GroupRadioHooked} from '../../../components/form';

const themeOptions = [
  {
    label: 'Device settings',
    value: 'device',
  },
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'Dark',
    value: 'dark',
  },
];

export const SettingsForm = () => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      themeMode: themeOptions[0].value,
    },
  });

  const onSubmit = handleSubmit(values => {
    console.warn(values);
  });

  return (
    <View>
      <GroupRadioHooked
        name="themeMode"
        control={control}
        items={themeOptions}
      />
      <Button onPress={onSubmit}>Save</Button>
    </View>
  );
};
