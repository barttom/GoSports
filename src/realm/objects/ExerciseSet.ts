import {Realm} from '@realm/react';

export interface ExerciseSetAttrs {
  reps: number;
  series: number;
  weightKg: number;
  breakSeconds: number;
}

export class ExerciseSet extends Realm.Object {
  reps!: number;
  series!: number;
  weightKg!: number;
  breakSeconds!: number;

  static schema = {
    name: 'ExerciseSet',
    embedded: true,
    properties: {
      reps: 'int',
      series: 'int',
      weightKg: 'int',
      breakSeconds: 'int',
    },
  };
}

export default ExerciseSet;
