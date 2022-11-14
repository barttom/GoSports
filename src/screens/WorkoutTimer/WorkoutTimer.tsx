import React, {useEffect} from 'react';
import {Text} from 'react-native-paper';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {View} from 'react-native';
import {MainNavigatorParams} from '../../navigation';
import {useRealm} from '../../realm';
import {WorkoutAttr} from '../../realm/objects/Workout';
import {useMakeStyles} from '../../hooks/useMakeStyles';
import {WorkoutTimerCounter} from './WorkoutTimerCounter/WorkoutTimerCounter';

export const WorkoutTimer = () => {
  const {params} =
    useRoute<
      RouteProp<Record<string, MainNavigatorParams['AddWorkout']>, string>
    >();
  const workoutId = params?.workoutId;
  const realm = useRealm();
  const {setOptions} = useNavigation();
  const workout = workoutId
    ? realm.objectForPrimaryKey<WorkoutAttr>(
        'Workout',
        Realm.BSON.ObjectId.createFromHexString(workoutId),
      )
    : null;
  const {styles} = useMakeStyles(({layout}) => ({
    wrapper: {
      padding: layout.gap,
      flex: 1,
      position: 'relative',
    },
  }));

  useEffect(() => {
    if (workout) {
      setOptions({title: workout.title});
    }
  }, []);

  if (!workout) {
    return <Text>Sorry, we cannot find chosen workout </Text>;
  }

  const items = [...workout.items].sort((a, b) => a.order - b.order);

  return (
    <View style={styles.wrapper}>
      <WorkoutTimerCounter items={items} />
    </View>
  );
};
