import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Workouts, Exercises, Settings} from '../screens';

export type TabNavigatorParams = {
  Workouts: undefined;
  Exercises: undefined;
  Settings: undefined;
};

const Tab = createMaterialBottomTabNavigator<TabNavigatorParams>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
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
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
