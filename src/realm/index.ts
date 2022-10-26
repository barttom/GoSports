import {createRealmContext} from '@realm/react';
import Exercise from './objects/Exercise';

export const {RealmProvider, useRealm, useQuery, useObject} =
  createRealmContext({schema: [Exercise]});
