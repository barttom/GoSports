import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Provider as PaperProvider, Avatar} from 'react-native-paper';

import {Colors} from 'react-native/Libraries/NewAppScreen';

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <PaperProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{...backgroundStyle}}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
              flexShrink: 1,
              flexDirection: 'row',
            }}>
            <Avatar.Icon icon="weight-lifter" size={24} />
            <Text>Go Sports!</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};
