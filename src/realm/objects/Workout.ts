import {Realm} from '@realm/react';
import {WorkoutItemAttrs} from './WorkoutItem';

export interface WorkoutAttr {
  title: string;
  items: WorkoutItemAttrs[];
}

class Workout extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  items!: WorkoutItemAttrs[];
  createdAt!: Date;

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
      createdAt: 'date',
    },
  };
}

export default Workout;
