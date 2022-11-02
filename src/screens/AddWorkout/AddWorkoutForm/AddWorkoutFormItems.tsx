import React, {useMemo} from 'react';
import {Control, useFieldArray} from 'react-hook-form';
import {View} from 'react-native';
import {DropdownHooked} from '../../../components/form';
import {useQuery} from '../../../realm';
import Exercise from '../../../realm/objects/Exercise';
import {AddWorkoutFormItemsSets} from './AddWorkoutFormItemsSets';

export type AddWorkoutFormItemsProps = {control: Control<any>};

export const AddWorkoutFormItems = ({control}: AddWorkoutFormItemsProps) => {
  const {fields} = useFieldArray({control, name: 'items'});
  const exercises = useQuery<Exercise>('Exercise');
  const exercisesOptions = useMemo(
    () =>
      exercises.map(({title, _id}) => ({
        label: title,
        value: _id.toHexString(),
      })),
    [exercises],
  );

  return (
    <View>
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
        </View>
      ))}
    </View>
  );
};
