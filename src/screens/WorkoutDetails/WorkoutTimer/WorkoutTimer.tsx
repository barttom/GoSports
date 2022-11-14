import React from 'react';
import {List} from 'react-native-paper';
import {FlatList} from 'react-native';
import {WorkoutItemAttrs} from '../../../realm/objects/WorkoutItem';
import {useMakeStyles} from '../../../hooks/useMakeStyles';

export type WorkoutTimerCounterProps = {items: WorkoutItemAttrs[]};

export const WorkoutTimer = ({items}: WorkoutTimerCounterProps) => {
  const {styles} = useMakeStyles(() => ({
    itemShadowed: {
      opacity: 0.5,
    },
  }));

  return (
    <FlatList
      data={items}
      renderItem={({item: {exercise, sets}}) => {
        const data = sets[0];

        return (
          <List.Item
            style={styles.itemShadowed}
            title={exercise.title}
            description={`${data.series} series | ${data.reps} reps | ${data.weightKg}kg`}
          />
        );
      }}
    />
  );
};
