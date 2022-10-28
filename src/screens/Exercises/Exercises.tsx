import React, {useCallback} from 'react';
import {IconButton, Text} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQuery, useRealm} from '../../realm';
import Exercise from '../../realm/objects/Exercise';
import {MainNavigatorParams} from '../../navigation';
import {useMakeStyles} from '../../hooks/useMakeStyles';

export const Exercises = () => {
  const realm = useRealm();
  const {styles, theme} = useMakeStyles(({layout}) => ({
    addNewButton: {
      alignSelf: 'flex-end',
      marginRight: layout.gap,
      marginBottom: layout.gap,
    },
    wrapper: {flexGrow: 1, paddingHorizontal: layout.gap},
    list: {flexGrow: 9},
    listItem: {
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    actions: {
      flexGrow: 0,
    },
  }));
  const items = useQuery<Exercise>(Exercise);
  const {navigate} = useNavigation<StackNavigationProp<MainNavigatorParams>>();
  const handleOpenAddExercise = useCallback(() => {
    navigate('AddExercise');
  }, [navigate]);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={items}
        style={styles.list}
        renderItem={({item: {title, _id}}) => (
          <View style={styles.listItem}>
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
      <View style={styles.actions}>
        <IconButton
          icon="plus"
          mode="contained"
          iconColor={theme.colors.primary}
          size={40}
          onPress={handleOpenAddExercise}
          style={styles.addNewButton}
        />
      </View>
    </View>
  );
};
