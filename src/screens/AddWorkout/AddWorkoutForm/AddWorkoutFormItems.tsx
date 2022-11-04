import React, {useCallback, useMemo} from 'react';
import {Control, useFieldArray} from 'react-hook-form';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {DropdownHooked, TimeLengthPickerHooked} from '../../../components/form';
import {useQuery} from '../../../realm';
import Exercise from '../../../realm/objects/Exercise';
import {AddWorkoutFormItemsSets} from './AddWorkoutFormItemsSets';

export type AddWorkoutFormItemsProps = {control: Control<any>};

export const AddWorkoutFormItems = ({control}: AddWorkoutFormItemsProps) => {
  const {fields, append} = useFieldArray({control, name: 'items'});
  const exercises = useQuery<Exercise>('Exercise');
  const exercisesOptions = useMemo(
    () =>
      exercises.map(({title, _id}) => ({
        label: title,
        value: _id.toHexString(),
      })),
    [exercises],
  );
  const handleAddNewItem = useCallback(() => {
    append({
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
    });
  }, []);

  return (
    <View style={{flexGrow: 1}}>
      {fields.map(({id}, index) => (
        <View key={id}>
          <DropdownHooked
            label="Exercise"
            mode="flat"
            list={exercisesOptions}
            name={`items[${index}].exerciseId`}
            control={control}
          />
          <AddWorkoutFormItemsSets itemIndex={index} control={control} />
          <TimeLengthPickerHooked
            name={`items[${index}].breakSeconds`}
            control={control}
            label="Break time:"
          />
        </View>
      ))}
      <Button mode="contained-tonal" onPress={handleAddNewItem}>
        Add next
      </Button>
    </View>
  );
};
