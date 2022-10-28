import React from 'react';
import {useForm} from 'react-hook-form';
import {Alert, ScrollView} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {TextInputHooked} from '../../../components/form';
import {MuscleItem} from '../../../constants/muscels';
import {useAppTheme} from '../../../layout/theme';

export type AddExerciseFormValues = {
  title: string;
  description?: string;
  muscle: MuscleItem;
};

export const AddExerciseForm = () => {
  const {handleSubmit, control} = useForm<AddExerciseFormValues>({
    defaultValues: {
      title: '',
      muscle: undefined,
    },
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
