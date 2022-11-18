import React, {useCallback} from 'react';
import {IconButton, Text} from 'react-native-paper';
import {FlatList, Linking, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useMakeStyles} from '../../hooks/useMakeStyles';
import {MainNavigatorParams} from '../../navigation';
import {useQuery} from '../../realm';
import Workout from '../../realm/objects/Workout';
import Exercise from '../../realm/objects/Exercise';
import {WorkoutItem} from './WorkoutItem/WorkoutItem';

export const Workouts = () => {
  const {navigate} = useNavigation<StackNavigationProp<MainNavigatorParams>>();
  const workouts = useQuery<Workout>(Workout);
  const exercises = useQuery<Exercise>(Exercise);
  const {styles, theme} = useMakeStyles(({layout, colors}) => ({
    addNewButton: {
      alignSelf: 'flex-end',
      marginRight: layout.gap,
      marginBottom: layout.gap,
    },
    wrapper: {flexGrow: 1, paddingHorizontal: layout.gap},
    noExercisesWrapper: {
      padding: layout.gap,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    inlineButton: {
      color: colors.primary,
      fontWeight: 'bold',
    },
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

  if (!exercises.length) {
    const handleNavigateToExercises = () =>
      Linking.openURL('gosports://exercises');

    const handleNavigateToAddExercise = () => navigate('AddExercise');

    return (
      <View style={styles.noExercisesWrapper}>
        <Text>Looks like You dont have any exercises.</Text>
        <Text> Go to</Text>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={handleNavigateToExercises}>
          <Text style={styles.inlineButton}>Exercises</Text>
        </TouchableOpacity>
        <Text>&nbsp;tab or add&nbsp;</Text>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={handleNavigateToAddExercise}>
          <Text style={styles.inlineButton}>directly</Text>
        </TouchableOpacity>
        <Text>&nbsp;instead</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={workouts}
        style={styles.list}
        renderItem={({item: {title, items, _id}}) => (
          <WorkoutItem title={title} exerciseCounter={items.length} id={_id} />
        )}
        keyExtractor={({_id}) => _id.toHexString()}
      />
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
