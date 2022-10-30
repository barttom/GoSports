import React, {useCallback} from 'react';
import {IconButton} from 'react-native-paper';
import {View} from 'react-native';
import {useMakeStyles} from '../../hooks/useMakeStyles';
import {useRealm} from '../../realm';
import Workout from '../../realm/objects/Workout';
import {Muscles} from '../../constants/muscels';

// export type WorkoutsProps = {};

export const Workouts = (/*{}: WorkoutsProps*/) => {
  const realm = useRealm();
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
    realm.write(() => {
      realm.create(
        'Workout',
        Workout.generate({
          title: 'test workout',
          items: [
            {
              order: 1,
              exercise: {
                title: 'some nice',
                muscle: Muscles.abs,
              },
              sets: [
                {
                  breakSeconds: 120,
                  reps: 5,
                  series: 5,
                  weightKg: 20,
                },
              ],
            },
          ],
        }),
      );
    });
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
