import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './TabNavigator';

export type MainNavigatorParams = {
  Home: undefined;
};
const Stack = createNativeStackNavigator<MainNavigatorParams>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{title: 'Pump It!'}}
      />
    </Stack.Navigator>
  );
};
