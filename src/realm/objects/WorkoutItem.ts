import Exercise from './Exercise';
import ExerciseSet from './ExerciseSet';

class WorkoutItem extends Realm.Object {
  order!: number;
  exercise!: Exercise;
  sets!: ExerciseSet[];

  static schema = {
    name: 'WorkoutItem',
    embedded: true,
    properties: {
      order: 'int',
      exercise: 'Exercise',
      sets: 'ExerciseSet[]',
    },
  };
}

export default WorkoutItem;
