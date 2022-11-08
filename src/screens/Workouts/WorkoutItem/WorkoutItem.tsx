import React from 'react';
import {List} from 'react-native-paper';

export type WorkoutItemProps = {
  title: string;
  exerciseCounter: number;
};

export const WorkoutItem = ({title, exerciseCounter}: WorkoutItemProps) => {
  return (
    <List.Item
      title={title}
      description={`${exerciseCounter} exercise${
        exerciseCounter === 1 ? '' : 's'
      }`}
    />
  );
};
