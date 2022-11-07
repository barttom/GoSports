import {Realm} from '@realm/react';
import {Muscles} from '../../constants/muscels';

class WorkoutExercise extends Realm.Object {
  title!: string;
  description?: string;
  muscle!: Muscles;

  static schema = {
    name: 'WorkoutExercise',
    embedded: true,
    properties: {
      title: 'string',
      description: 'string?',
      muscle: 'string',
    },
  };
}

export default WorkoutExercise;
