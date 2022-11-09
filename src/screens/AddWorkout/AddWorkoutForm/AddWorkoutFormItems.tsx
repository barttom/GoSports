import React, {useCallback, useMemo} from 'react';
import {Control, useFieldArray} from 'react-hook-form';
import {View} from 'react-native';
import {Button, Card, IconButton, Text} from 'react-native-paper';
import {DropdownHooked, TimeLengthPickerHooked} from '../../../components/form';
import {useQuery} from '../../../realm';
import Exercise from '../../../realm/objects/Exercise';
import {useMakeStyles} from '../../../hooks/useMakeStyles';
import {WorkoutItemAttrs} from '../../../realm/objects/WorkoutItem';
import {AddWorkoutFormItemsSets} from './AddWorkoutFormItemsSets';
import {AddWorkoutFormValues} from './AddWorkoutForm';

export type AddWorkoutFormItemsProps = {
  control: Control<any>;
  initialItems?: WorkoutItemAttrs[];
  isEditMode: boolean;
};

export const AddWorkoutFormItems = ({
  control,
  initialItems,
  isEditMode,
}: AddWorkoutFormItemsProps) => {
  const {fields, append, remove} = useFieldArray<AddWorkoutFormValues>({
    control,
    name: 'items' as 'items',
  });

  const exercises = useQuery<Exercise>('Exercise');
  const {styles} = useMakeStyles(({layout}) => ({
    actions: {
      paddingVertical: 0,
      marginTop: 0,
    },
    addNextButton: {
      marginTop: layout.gap,
    },
    title: {
      marginBottom: layout.gap,
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
    const newOrderValue = fields.length
      ? fields
          .map(
            item =>
              (
                item as AddWorkoutFormValues['items'][0] & {
                  id: string;
                  order: number;
                }
              ).order,
          )
          .sort((a, b) => b - a)[0] + 1
      : 0;

    append({
      order: newOrderValue,
      breakSeconds: '0',
      sets: [
        {
          reps: '',
          series: '',
          weightKg: '',
        },
      ],
      exerciseId: undefined,
    });
  }, [fields]);
  const handleRemoveItem = useCallback((index: number) => {
    remove(index);
  }, []);

  return (
    <View style={{flexGrow: 1}}>
      {fields.map(({id, ...field}, index) => {
        const initialItem = initialItems?.find(
          item =>
            (field as AddWorkoutFormValues['items'][0]).order === item.order,
        );

        return (
          <Card
            key={id}
            mode={(index + 2) % 2 === 0 ? 'outlined' : 'contained'}>
            <Card.Content>
              {initialItem ? (
                <Text style={styles.title} variant="titleLarge">
                  {initialItem.exercise.title}
                </Text>
              ) : (
                <DropdownHooked
                  label="Exercise"
                  mode="flat"
                  list={exercisesOptions}
                  name={`items[${index}].exerciseId`}
                  control={control}
                />
              )}

              <AddWorkoutFormItemsSets
                itemIndex={index}
                control={control}
                isEditMode={isEditMode}
              />
              <TimeLengthPickerHooked
                name={`items[${index}].breakSeconds`}
                control={control}
                label="Break time:"
                editable={isEditMode}
                defaultValue={Number(
                  (field as AddWorkoutFormValues['items'][0]).breakSeconds,
                )}
              />
            </Card.Content>
            <Card.Actions style={styles.actions}>
              {isEditMode && (
                <IconButton
                  icon="trash-can-outline"
                  onPress={() => handleRemoveItem(index)}
                />
              )}
            </Card.Actions>
          </Card>
        );
      })}
      {isEditMode && (
        <Button
          style={styles.addNextButton}
          mode="contained-tonal"
          onPress={handleAddNewItem}>
          Add next
        </Button>
      )}
    </View>
  );
};
