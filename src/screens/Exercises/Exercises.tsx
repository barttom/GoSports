import React, {useCallback} from 'react';
import {IconButton, Text, useTheme} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQuery, useRealm} from '../../realm';
import Exercise from '../../realm/objects/Exercise';
import {MainNavigatorParams} from '../../navigation';

export const Exercises = () => {
  const realm = useRealm();
  const {colors} = useTheme();
  const items = useQuery<Exercise>(Exercise);
  const {navigate} = useNavigation<StackNavigationProp<MainNavigatorParams>>();
  const handleOpenAddExercise = useCallback(() => {
    navigate('AddExercise');
  }, []);

  return (
    <View style={{flexGrow: 1}}>
      <FlatList
        data={items}
        style={{flexGrow: 9}}
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
      <View style={{flexGrow: 0}}>
        <IconButton
          icon="plus"
          mode="contained"
          iconColor={colors.primary}
          size={40}
          onPress={handleOpenAddExercise}
          style={{alignSelf: 'flex-end', marginRight: 40, marginBottom: 16}}
        />
      </View>
    </View>
  );
};
