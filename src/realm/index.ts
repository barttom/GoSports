import {createRealmContext} from '@realm/react';
import {Configuration} from 'realm';
import Exercise from './objects/Exercise';
import Workout from './objects/Workout';
import ExerciseSet from './objects/ExerciseSet';
import WorkoutItem from './objects/WorkoutItem';

export const realmConfig: Configuration = {
  schema: [Exercise, ExerciseSet, Workout, WorkoutItem],
  schemaVersion: 3,
};
export const {RealmProvider, useRealm, useQuery, useObject} =
  createRealmContext(realmConfig);
