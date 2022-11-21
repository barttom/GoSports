import React from 'react';
import {View} from 'react-native';
import {useMakeStyles} from '../../hooks/useMakeStyles';
import {SettingsForm} from './SettingsForm';

export const Settings = () => {
  const {styles} = useMakeStyles(({layout}) => ({
    wrapper: {
      padding: layout.gap,
    },
  }));

  return (
    <View style={styles.wrapper}>
      <SettingsForm />
    </View>
  );
};
