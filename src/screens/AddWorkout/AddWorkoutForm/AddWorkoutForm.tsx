import React, {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {ScrollView, View} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {IconButton} from 'react-native-paper';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TextInputHooked} from '../../../components/form';
import {useMakeStyles} from '../../../hooks/useMakeStyles';
import Workout, {WorkoutAttr} from '../../../realm/objects/Workout';
import {WorkoutItemAttrs} from '../../../realm/objects/WorkoutItem';
import {useRealm} from '../../../realm';
import {ExerciseAttr} from '../../../realm/objects/Exercise';
import {Muscles} from '../../../constants/muscels';
import {MainNavigatorParams} from '../../../navigation';
import {AddWorkoutFormItems} from './AddWorkoutFormItems';

export type AddWorkoutFormValues = {
  title: WorkoutAttr['title'];
  items: Array<{
    order: WorkoutItemAttrs['order'];
    sets: {
      reps: string;
      series: string;
      weightKg: string;
    }[];
    breakSeconds: string;
    exerciseId?: string;
  }>;
};

const validationSchema = yup
  .object({
    title: yup.string().required(),
    items: yup.array(
      yup.object({
        order: yup.number().required(),
        exerciseId: yup.string(),
        breakSeconds: yup.string().required(),
        sets: yup
          .array(
            yup.object({
              reps: yup.string().required(),
              series: yup.string().required(),
              weightKg: yup.string().required(),
            }),
          )
          .required(),
      }),
    ),
  })
  .required();

export const AddWorkoutForm = () => {
  const {params} =
    useRoute<
      RouteProp<Record<string, MainNavigatorParams['AddWorkout']>, string>
    >();
  const workoutId = params?.workoutId;
  const realm = useRealm();
  const {goBack, setOptions, navigate} =
    useNavigation<StackNavigationProp<MainNavigatorParams>>();
  const [isEditMode, setIsEditMode] = useState(!workoutId);
  const initialWorkout = workoutId
    ? realm.objectForPrimaryKey<WorkoutAttr>(
        'Workout',
        Realm.BSON.ObjectId.createFromHexString(workoutId),
      )
    : null;
  const getInitialData = (): AddWorkoutFormValues | null => {
    if (!initialWorkout) {
      return null;
    }

    return {
      title: initialWorkout.title,
      items: initialWorkout.items
        .map(item => ({
          exerciseId: undefined,
          breakSeconds: item.breakSeconds.toString(),
          order: item.order,
          sets: item.sets.map(setItem => ({
            reps: setItem.reps.toString(),
            series: setItem.series.toString(),
            weightKg: setItem.weightKg.toString(),
          })),
        }))
        .sort((a, b) => a.order - b.order),
    };
  };

  const {control, handleSubmit, reset} = useForm<AddWorkoutFormValues>({
    defaultValues: getInitialData() || {
      title: '',
      items: [
        {
          order: 0,
          breakSeconds: undefined,
          sets: [
            {
              reps: '',
              series: '',
              weightKg: '',
            },
          ],
          exerciseId: undefined,
        },
      ],
    },
    resolver: yupResolver(validationSchema),
  });
  const {styles, theme} = useMakeStyles(({layout}) => ({
    wrapper: {
      padding: layout.gap,
      flex: 1,
      position: 'relative',
    },
    heading: {
      flexGrow: 0,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    saveButton: {
      marginLeft: layout.gap,
      marginTop: 8,
    },
    listWrapper: {
      flexGrow: 9,
    },
    scrollList: {
      flex: 1,
    },
    runWorkoutButton: {
      position: 'absolute',
      bottom: layout.gap,
      right: layout.gap,
    },
  }));
  const onStartWorkout = useCallback(() => {
    navigate('WorkoutTimer', {workoutId: workoutId!});
  }, []);

  const onSubmit = async ({title, items}: AddWorkoutFormValues) => {
    const parsedItems: WorkoutItemAttrs[] = items.map(
      ({exerciseId, sets, breakSeconds, order}) => {
        const exercise = exerciseId
          ? realm.objectForPrimaryKey<ExerciseAttr>(
              'Exercise',
              Realm.BSON.ObjectId.createFromHexString(exerciseId),
            )
          : initialWorkout?.items.find(item => item.order === order)?.exercise;

        return {
          order,
          breakSeconds: Number(breakSeconds),
          exercise: {
            title: exercise?.title || '',
            description: exercise?.description,
            muscle: exercise?.muscle || Muscles.abs,
          },
          sets: sets.map(({reps, series, weightKg}) => ({
            reps: Number(reps),
            series: Number(series),
            weightKg: Number(weightKg),
          })),
        };
      },
    );

    try {
      await realm.write(() => {
        if (initialWorkout) {
          initialWorkout.title = title;
          initialWorkout.items = parsedItems;
        } else {
          realm.create(
            'Workout',
            Workout.generate({
              title,
              items: parsedItems,
            }),
          );
        }
      });
      goBack();
    } catch (error) {
      console.warn(error);
    }
  };
  const onRestoreData = useCallback(() => {
    reset();
    setIsEditMode(false);
  }, []);

  useEffect(() => {
    if (initialWorkout) {
      setOptions({title: initialWorkout.title});
    }
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.heading}>
        <TextInputHooked
          name="title"
          control={control}
          label="Name"
          placeholder="Type workout name"
          mode="flat"
          editable={isEditMode}
        />
        {isEditMode ? (
          <>
            <IconButton
              style={styles.saveButton}
              mode="contained"
              containerColor={theme.colors.primary}
              iconColor={theme.colors.onPrimary}
              onPress={handleSubmit(onSubmit)}
              icon={'content-save-outline'}
            />
            {!!initialWorkout && (
              <IconButton
                style={styles.saveButton}
                mode="contained"
                onPress={onRestoreData}
                icon={'backup-restore'}
              />
            )}
          </>
        ) : (
          <IconButton
            style={styles.saveButton}
            mode="contained"
            containerColor={theme.colors.primary}
            iconColor={theme.colors.onPrimary}
            onPress={() => setIsEditMode(true)}
            icon={'pencil-outline'}
          />
        )}
      </View>
      <View style={styles.listWrapper}>
        <ScrollView style={styles.scrollList}>
          <AddWorkoutFormItems
            control={control}
            initialItems={initialWorkout?.items}
            isEditMode={isEditMode}
          />
        </ScrollView>
      </View>
      {!isEditMode && !!initialWorkout && (
        <IconButton
          style={styles.runWorkoutButton}
          icon="play-circle-outline"
          mode="contained"
          size={40}
          onPress={onStartWorkout}
        />
      )}
    </View>
  );
};
