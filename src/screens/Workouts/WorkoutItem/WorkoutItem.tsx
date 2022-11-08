import React, {useCallback} from 'react';
import {List} from 'react-native-paper';
import {TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Realm} from '@realm/react';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainNavigatorParams} from '../../../navigation';

export type WorkoutItemProps = {
  title: string;
  exerciseCounter: number;
  id: Realm.BSON.ObjectId;
};

export const WorkoutItem = ({title, exerciseCounter, id}: WorkoutItemProps) => {
  const {navigate} = useNavigation<StackNavigationProp<MainNavigatorParams>>();
  const handleOpenWorkout = useCallback(() => {
    navigate('AddWorkout', {workoutId: id.toHexString()});
  }, [id]);

  return (
    <TouchableHighlight accessibilityRole="button" onPress={handleOpenWorkout}>
      <List.Item
        title={title}
        description={`${exerciseCounter} exercise${
          exerciseCounter === 1 ? '' : 's'
        }`}
      />
    </TouchableHighlight>
  );
};
