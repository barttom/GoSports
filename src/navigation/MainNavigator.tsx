import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddExercise} from '../screens/AddExercise';
import {TabNavigator} from './TabNavigator';

export type MainNavigatorParams = {
  Home: undefined;
  AddExercise: undefined;
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
      <Stack.Screen
        name="AddExercise"
        component={AddExercise}
        options={{title: 'Add new exercise', presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};
