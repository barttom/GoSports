import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {Button, Text} from 'react-native-paper';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {TextInputHooked, DropdownHooked} from '../../../components/form';
import {musclesList} from '../../../constants/muscels';
import {useAppTheme} from '../../../layout/theme';
import {useRealm} from '../../../realm';
import Exercise, {ExerciseAttr} from '../../../realm/objects/Exercise';

export type AddExerciseFormValues = ExerciseAttr;

const validationSchema = yup
  .object({
    title: yup.string().required(),
    description: yup.string(),
    muscle: yup.string().required(),
  })
  .required();

export const AddExerciseForm = () => {
  const {handleSubmit, control, formState} = useForm<AddExerciseFormValues>({
    defaultValues: {
      title: '',
      muscle: undefined,
    },
    resolver: yupResolver(validationSchema),
  });
  const theme = useAppTheme();
  const realm = useRealm();
  const {goBack} = useNavigation();
  const onSubmit = async (values: AddExerciseFormValues) => {
    try {
      await realm.write(() => {
        realm.create('Exercise', Exercise.generate(values));
      });
      goBack();
    } catch (e) {
      console.warn(e);
    }
  };
  const disabled = formState.isSubmitting;

  return (
    <ScrollView style={{padding: theme.layout.gap}}>
      <TextInputHooked
        name="title"
        control={control}
        label="Name"
        placeholder="Type exercise name"
        disabled={disabled}
      />
      <DropdownHooked
        name="muscle"
        label="Muscle"
        placeholder="Select part fo body"
        list={musclesList}
        control={control}
        disabled={disabled}
      />
      <TextInputHooked
        name="description"
        control={control}
        label="Description"
        placeholder="Add optional description"
        numberOfLines={4}
        multiline
        disabled={disabled}
      />
      <Button
        mode="contained-tonal"
        onPress={handleSubmit(onSubmit)}
        theme={theme}
        disabled={disabled}>
        <Text>Save</Text>
      </Button>
    </ScrollView>
  );
};
