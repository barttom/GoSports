import {Realm} from '@realm/react';
import {ThemeMode} from '../../constants/themeMode';

export interface SettingsAttr {
  themeMode: ThemeMode;
}

class Settings extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  themeMode!: ThemeMode;
  createdAt!: Date;

  static generate({themeMode}: SettingsAttr) {
    return {
      _id: new Realm.BSON.ObjectId(),
      createdAt: new Date(),
      themeMode,
    };
  }

  static schema = {
    name: 'Settings',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      createdAt: 'date',
      themeMode: 'string',
    },
  };
}

export default Settings;
