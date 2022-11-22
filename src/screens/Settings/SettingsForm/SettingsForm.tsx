import React from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';
import {Button, Text} from 'react-native-paper';
import {GroupRadioHooked} from '../../../components/form';
import {useRealm} from '../../../realm';
import Settings from '../../../realm/objects/Settings';
import {ThemeMode} from '../../../constants/themeMode';
export type SettingsFormValues = {
  themeMode: ThemeMode;
};

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
  const realm = useRealm();
  const initialSettings = realm.objects<Settings>('Settings')[0];
  const {control, handleSubmit} = useForm<SettingsFormValues>({
    defaultValues: {
      themeMode: initialSettings.themeMode,
    },
  });

  const onSubmit = ({themeMode}: SettingsFormValues) => {
    realm.write(() => {
      initialSettings.themeMode = themeMode;
    });
  };

  return (
    <View>
      <Text variant="titleLarge">Theme mode</Text>
      <GroupRadioHooked
        name="themeMode"
        control={control}
        items={themeOptions}
      />
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Save
      </Button>
    </View>
  );
};
