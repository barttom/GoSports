import React, {useCallback} from 'react';
import {IconButton} from 'react-native-paper';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useMakeStyles} from '../../hooks/useMakeStyles';
import {MainNavigatorParams} from '../../navigation';

// export type WorkoutsProps = {};

export const Workouts = (/*{}: WorkoutsProps*/) => {
  const {navigate} = useNavigation<StackNavigationProp<MainNavigatorParams>>();
  const {styles, theme} = useMakeStyles(({layout}) => ({
    addNewButton: {
      alignSelf: 'flex-end',
      marginRight: layout.gap,
      marginBottom: layout.gap,
    },
    wrapper: {flexGrow: 1, paddingHorizontal: layout.gap},
    list: {flexGrow: 9},
    listItem: {
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    actions: {
      flexGrow: 0,
    },
  }));
  const handleOpenWorkout = useCallback(() => {
    navigate('AddWorkout');
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.list} />
      <View style={styles.actions}>
        <IconButton
          icon="plus"
          mode="contained"
          iconColor={theme.colors.primary}
          size={40}
          onPress={handleOpenWorkout}
          style={styles.addNewButton}
        />
      </View>
    </View>
  );
};
