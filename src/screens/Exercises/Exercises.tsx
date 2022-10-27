import React, {useCallback} from 'react';
import {IconButton, Text, Button} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import {useQuery, useRealm} from '../../realm';
import Exercise from '../../realm/objects/Exercise';

export const Exercises = () => {
  const realm = useRealm();
  const items = useQuery<Exercise>(Exercise);
  const onAdd = useCallback(() => {
    realm.write(() => {
      realm.create(
        'Exercise',
        Exercise.generate({title: ' first', description: 'some description'}),
      );
    });
  }, [realm]);

  console.warn(items);

  return (
    <View>
      <Text>Exercises</Text>
      <Button mode="contained" onPress={onAdd}>
        <Text>Add simple</Text>
      </Button>
      <FlatList
        data={items}
        renderItem={({item: {title, _id}}) => (
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>{title}</Text>
            <IconButton
              icon="trash-can-outline"
              onPress={() => {
                realm.write(() => {
                  realm.delete(realm.objectForPrimaryKey('Exercise', _id));
                });
              }}
            />
          </View>
        )}
      />
    </View>
  );
};
