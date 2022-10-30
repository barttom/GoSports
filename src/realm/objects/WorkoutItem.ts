import {ExerciseSetAttrs} from './ExerciseSet';
import {ExerciseAttr} from './Exercise';

export interface WorkoutItemAttrs {
  order: number;
  exercise: ExerciseAttr;
  sets: ExerciseSetAttrs[];
}

class WorkoutItem extends Realm.Object {
  order!: number;
  exercise!: ExerciseAttr;
  sets!: ExerciseSetAttrs[];

  static schema = {
    name: 'WorkoutItem',
    embedded: true,
    properties: {
      order: 'int',
      exercise: 'WorkoutExercise',
      sets: 'ExerciseSet[]',
    },
  };
}

export default WorkoutItem;
