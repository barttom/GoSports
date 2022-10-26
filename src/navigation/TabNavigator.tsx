import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Plans, Workouts, Exercises} from '../screens';

export type TabNavigatorParams = {
  Plans: undefined;
  Workouts: undefined;
  Exercises: undefined;
};

const Tab = createMaterialBottomTabNavigator<TabNavigatorParams>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Plans"
        component={Plans}
        options={{
          tabBarLabel: 'Plans',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="calendar-month-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Workouts"
        component={Workouts}
        options={{
          tabBarLabel: 'Workouts',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="format-list-checks"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={Exercises}
        options={{
          tabBarLabel: 'Exercises',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="weight-lifter"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
