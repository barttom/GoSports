import {Realm} from '@realm/react';
import WorkoutItem from './WorkoutItem';

export interface WorkoutAttr {
  title: string;
  items: WorkoutItem[];
}

class Workout extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  items!: WorkoutItem[];

  static generate({title, items}: WorkoutAttr) {
    return {
      _id: new Realm.BSON.ObjectId(),
      title,
      items,
      createdAt: new Date(),
    };
  }

  static schema = {
    name: 'Workout',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      items: 'WorkoutItem[]',
    },
  };
}

export default Workout;
