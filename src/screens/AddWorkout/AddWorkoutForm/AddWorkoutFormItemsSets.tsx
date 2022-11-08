import React from 'react';
import {Control, useFieldArray} from 'react-hook-form';
import {View} from 'react-native';
import {NumberInputHooked} from '../../../components/form';
import {useMakeStyles} from '../../../hooks/useMakeStyles';
import {AddWorkoutFormValues} from './AddWorkoutForm';

export type AddWorkoutFormItemsSetsProps = {
  itemIndex: number;
  control: Control<any>;
};

export const AddWorkoutFormItemsSets = ({
  itemIndex,
  control,
}: AddWorkoutFormItemsSetsProps) => {
  const {styles} = useMakeStyles(({layout}) => ({
    wrapper: {
      flexDirection: 'row',
      marginBottom: layout.gap,
    },
    item: {
      marginHorizontal: layout.gap,
    },
  }));
  const name = `items[${itemIndex}].sets`;
  const {fields} = useFieldArray<AddWorkoutFormValues>({
    name: name as 'items.0.sets',
    control,
  });

  return (
    <>
      {fields.map(({id}, index) => (
        <View key={id} style={styles.wrapper}>
          <NumberInputHooked
            style={styles.item}
            label="Series"
            name={`${name}[${index}].series`}
            control={control}
            bottomSpace={0}
            withErrorMessage={false}
          />
          <NumberInputHooked
            style={styles.item}
            label="Reps"
            name={`${name}.${index}.reps`}
            control={control}
            bottomSpace={0}
            withErrorMessage={false}
          />
          <NumberInputHooked
            style={styles.item}
            label="Weight"
            name={`${name}.${index}.weightKg`}
            control={control}
            bottomSpace={0}
            withErrorMessage={false}
            allowDecimals
          />
        </View>
      ))}
    </>
  );
};
