import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {Alert, ScrollView, View} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button} from 'react-native-paper';
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
    }[];
    breakSeconds: string;
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
  const {control, handleSubmit} = useForm<AddWorkoutFormValues>({
    defaultValues: {
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
  const {styles, theme} = useMakeStyles(({layout, colors}) => ({
    wrapper: {
      padding: layout.gap,
      flex: 1,
    },
    heading: {
      flexGrow: 0,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: layout.gap,
      borderBottomWidth: 1,
      borderBottomColor: colors.outline,
      borderBottomStyle: 'solid',
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
  }));
  const onSubmit = (data: AddWorkoutFormValues) => {
    Alert.alert(JSON.stringify(data));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.heading}>
        <TextInputHooked
          name="title"
          control={control}
          label="Name"
          placeholder="Type workout name"
          mode="flat"
        />
        <Button
          style={styles.saveButton}
          mode="contained"
          theme={theme}
          onPress={handleSubmit(onSubmit)}>
          Save
        </Button>
      </View>
      <View style={styles.listWrapper}>
        <ScrollView style={styles.scrollList}>
          <AddWorkoutFormItems control={control} />
        </ScrollView>
      </View>
    </View>
  );
};
