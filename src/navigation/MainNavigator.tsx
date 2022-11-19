import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import {AddExercise} from '../screens/AddExercise';
import {AddWorkout} from '../screens/AddWorkout';
import {WorkoutDetails} from '../screens';
import {TabNavigator, TabNavigatorParams} from './TabNavigator';

export type MainNavigatorParams = {
  Home: NavigatorScreenParams<TabNavigatorParams>;
  AddExercise: undefined;
  AddWorkout?: {
    workoutId: string;
  };
  WorkoutDetails: {
    workoutId: string;
  };
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
        options={{title: 'Add new exercise', presentation: 'card'}}
      />
      <Stack.Screen
        name="AddWorkout"
        component={AddWorkout}
        options={{title: 'Add new workout', presentation: 'card'}}
      />
      <Stack.Screen
        name="WorkoutDetails"
        component={WorkoutDetails}
        options={{title: 'Workout time!', presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};
