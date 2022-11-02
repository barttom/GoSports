import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {ScrollView} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Text} from 'react-native-paper';
import {TextInputHooked} from '../../../components/form';
import {useMakeStyles} from '../../../hooks/useMakeStyles';
import {WorkoutAttr} from '../../../realm/objects/Workout';
import {WorkoutItemAttrs} from '../../../realm/objects/WorkoutItem';
import {AddWorkoutFormItems} from './AddWorkoutFormItems';

export type AddWorkoutFormValues = {
  title: WorkoutAttr['title'];
  items: Array<{
    order: WorkoutItemAttrs['order'];
    sets: {
      reps: string;
      series: string;
      weightKg: string;
      breakSeconds: string;
    }[];
    exerciseId: string;
  }>;
};

const validationSchema = yup
  .object({
    title: yup.string().required(),
    items: yup.array(
      yup.object({
        order: yup.number().required(),
        exerciseId: yup.string().required(),
        sets: yup
          .array(
            yup.object({
              reps: yup.string().required(),
              series: yup.string().required(),
              weightKg: yup.string().required(),
              breakSeconds: yup.string().required(),
            }),
          )
          .required(),
      }),
    ),
  })
  .required();

export const AddWorkoutForm = () => {
  const {control, handleSubmit, formState} = useForm<AddWorkoutFormValues>({
    defaultValues: {
      title: '',
      items: [
        {
          order: 0,
          sets: [
            {
              reps: '',
              series: '',
              weightKg: '',
              breakSeconds: '',
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
    },
  }));

  console.warn(formState.errors);

  return (
    <ScrollView style={styles.wrapper}>
      <TextInputHooked
        name="title"
        control={control}
        label="Name"
        placeholder="Type workout name"
        mode="flat"
      />
      <AddWorkoutFormItems control={control} />
      <Button
        mode="contained-tonal"
        theme={theme}
        onPress={handleSubmit(data => console.warn(data))}>
        <Text>Save</Text>
      </Button>
    </ScrollView>
  );
};
