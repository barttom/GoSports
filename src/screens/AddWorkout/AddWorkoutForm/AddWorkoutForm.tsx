import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {ScrollView} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Text} from 'react-native-paper';
import {TextInputHooked} from '../../../components/form';
import {useMakeStyles} from '../../../hooks/useMakeStyles';

export type AddWorkoutFormValues = {
  title: string;
};

const validationSchema = yup.object({
  title: yup.string().required(),
});

export const AddWorkoutForm = () => {
  const {control, handleSubmit} = useForm<AddWorkoutFormValues>({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const {styles, theme} = useMakeStyles(({layout}) => ({
    wrapper: {
      padding: layout.gap,
    },
  }));

  return (
    <ScrollView style={styles.wrapper}>
      <TextInputHooked
        name="title"
        control={control}
        label="Name"
        placeholder="Type workout name"
      />
      <Button
        mode="contained-tonal"
        theme={theme}
        onPress={handleSubmit(data => console.warn(data))}>
        <Text>Save</Text>
      </Button>
    </ScrollView>
  );
};
