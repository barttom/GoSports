import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {MainNavigation} from './navigation/MainNavigation';

export const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
};
