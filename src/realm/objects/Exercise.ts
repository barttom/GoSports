import {Realm} from '@realm/react';

class Exercise extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  description!: string;
  createdAt!: Date;

  static generate({title, description}: {title: string; description?: string}) {
    return {
      _id: new Realm.BSON.ObjectId(),
      description,
      title,
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
      createdAt: 'date',
    },
  };
}

export default Exercise;
