import React, {useCallback, useMemo} from 'react';
import {Control, useFieldArray} from 'react-hook-form';
import {View} from 'react-native';
import {Button, Card, IconButton} from 'react-native-paper';
import {DropdownHooked, TimeLengthPickerHooked} from '../../../components/form';
import {useQuery} from '../../../realm';
import Exercise from '../../../realm/objects/Exercise';
import {useMakeStyles} from '../../../hooks/useMakeStyles';
import {AddWorkoutFormItemsSets} from './AddWorkoutFormItemsSets';

export type AddWorkoutFormItemsProps = {control: Control<any>};

export const AddWorkoutFormItems = ({control}: AddWorkoutFormItemsProps) => {
  const {fields, append, remove} = useFieldArray({control, name: 'items'});
  const exercises = useQuery<Exercise>('Exercise');
  const {styles} = useMakeStyles(({layout}) => ({
    actions: {
      paddingVertical: 0,
      marginTop: 0,
    },
    addNextButton: {
      marginTop: layout.gap,
    },
  }));
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
  const handleRemoveItem = useCallback((index: number) => {
    remove(index);
  }, []);

  return (
    <View style={{flexGrow: 1}}>
      {fields.map(({id}, index) => {
        const content = (
          <>
            <Card.Content>
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
            </Card.Content>
            <Card.Actions style={styles.actions}>
              <IconButton
                icon="trash-can-outline"
                onPress={() => handleRemoveItem(index)}
              />
            </Card.Actions>
          </>
        );
        return (index + 2) % 2 === 0 ? (
          <Card key={id} elevation={0}>
            {content}
          </Card>
        ) : (
          <Card key={id} mode="contained">
            {content}
          </Card>
        );
      })}
      <Button
        style={styles.addNextButton}
        mode="contained-tonal"
        onPress={handleAddNewItem}>
        Add next
      </Button>
    </View>
  );
};
