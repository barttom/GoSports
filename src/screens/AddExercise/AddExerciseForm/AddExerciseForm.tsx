import React from 'react';
import {useForm} from 'react-hook-form';
import {Alert, ScrollView} from 'react-native';
import {Button, Text} from 'react-native-paper';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {TextInputHooked, DropdownHooked} from '../../../components/form';
import {MuscleItem, musclesList} from '../../../constants/muscels';
import {useAppTheme} from '../../../layout/theme';

export type AddExerciseFormValues = {
  title: string;
  description?: string;
  muscle: MuscleItem;
};

const validationSchema = yup
  .object({
    title: yup.string().required(),
    description: yup.string(),
    muscle: yup.string().required(),
  })
  .required();

export const AddExerciseForm = () => {
  const {handleSubmit, control} = useForm<AddExerciseFormValues>({
    defaultValues: {
      title: '',
      muscle: undefined,
    },
    resolver: yupResolver(validationSchema),
  });
  const theme = useAppTheme();

  return (
    <ScrollView style={{padding: theme.layout.gap}}>
      <TextInputHooked
        name="title"
        control={control}
        label="Name"
        placeholder="Type exercise name"
      />
      <DropdownHooked
        name="muscle"
        label="Muscle"
        placeholder="Select part fo body"
        list={musclesList}
        control={control}
      />
      <TextInputHooked
        name="description"
        control={control}
        label="Description"
        placeholder="Add optional description"
        numberOfLines={4}
        multiline
      />
      <Button
        mode="contained-tonal"
        onPress={handleSubmit(data => {
          Alert.alert(JSON.stringify(data));
        })}
        theme={theme}>
        <Text>Save</Text>
      </Button>
    </ScrollView>
  );
};
