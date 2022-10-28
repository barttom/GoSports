import {Realm} from '@realm/react';
import {Muscles} from '../../constants/muscels';
export interface ExerciseAttr {
  title: string;
  description?: string;
  muscle: Muscles;
}
class Exercise extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  description?: string;
  muscle!: Muscles;
  createdAt!: Date;

  static generate({title, description, muscle}: ExerciseAttr) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      title,
      muscle,
      createdAt: new Date(),
    };
  }

  static schema = {
    name: 'Exercise',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      title: 'string',
      description: 'string?',
      muscle: 'string',
      createdAt: 'date',
    },
  };
}

export default Exercise;
