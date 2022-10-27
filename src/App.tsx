import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './navigation/MainNavigator';
import {RealmProvider} from './realm';

export const App = () => {
  return (
    <RealmProvider>
      <PaperProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PaperProvider>
    </RealmProvider>
  );
};
