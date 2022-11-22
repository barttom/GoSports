import {createRealmContext} from '@realm/react';
import {Configuration} from 'realm';
import Exercise from './objects/Exercise';
import Workout from './objects/Workout';
import ExerciseSet from './objects/ExerciseSet';
import WorkoutItem from './objects/WorkoutItem';
import WorkoutExercise from './objects/WorkoutExercise';
import Settings from './objects/Settings';

export const realmConfig: Configuration = {
  schema: [
    Exercise,
    ExerciseSet,
    Workout,
    WorkoutItem,
    WorkoutExercise,
    Settings,
  ],
  schemaVersion: 6,
};
export const {RealmProvider, useRealm, useQuery, useObject} =
  createRealmContext(realmConfig);
