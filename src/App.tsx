import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {Appearance} from 'react-native';
import {MainNavigator, MainNavigatorParams} from './navigation/MainNavigator';
import {RealmProvider} from './realm';
import {darkColors, lightColors, theme} from './layout/theme';
import {useInitialSettings} from './hooks/useInitialSettings';

export const App = () => {
  const {userSettings} = useInitialSettings();
  const colorScheme =
    userSettings.themeMode === 'device'
      ? Appearance.getColorScheme() || 'light'
      : userSettings.themeMode;
  const colors = {
    dark: darkColors,
    light: lightColors,
  };
  const currentTheme = {
    ...theme,
    dark: colorScheme === 'dark',
    colors: colors[colorScheme],
  };
  const linking: LinkingOptions<MainNavigatorParams> = {
    prefixes: ['gosports://'],
    config: {
      screens: {
        AddExercise: 'add-exercise',
        Home: {
          screens: {
            Exercises: 'exercises',
          },
        },
      },
    },
  };

  return (
    <RealmProvider>
      <PaperProvider theme={currentTheme}>
        <NavigationContainer
          theme={{
            ...currentTheme,
            colors: {
              ...currentTheme.colors,
              primary: currentTheme.colors.primary,
              background: currentTheme.colors.background,
              text: currentTheme.colors.onBackground,
              card: currentTheme.colors.primaryContainer,
              border: currentTheme.colors.onPrimaryContainer,
              notification: currentTheme.colors.background,
            },
          }}
          linking={linking}>
          <MainNavigator />
        </NavigationContainer>
      </PaperProvider>
    </RealmProvider>
  );
};
