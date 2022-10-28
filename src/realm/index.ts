import {createRealmContext} from '@realm/react';
import {Configuration} from 'realm';
import Exercise from './objects/Exercise';

export const realmConfig: Configuration = {
  schema: [Exercise],
  schemaVersion: 2,
};
export const {RealmProvider, useRealm, useQuery, useObject} =
  createRealmContext(realmConfig);
