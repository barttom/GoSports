import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Plans} from '../screens/Plans';
import {Workouts} from '../screens/Workouts';
import {Exercises} from '../screens/Exercises';

export type NavigatorParamList = {
  Plans: undefined;
  Workouts: undefined;
  Exercises: undefined;
};
const Stack = createNativeStackNavigator<NavigatorParamList>();

export const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Plans">
      <Stack.Screen name="Plans" component={Plans} />
      <Stack.Screen name="Workouts" component={Workouts} />
      <Stack.Screen name="Exercises" component={Exercises} />
    </Stack.Navigator>
  );
};
