import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Button, ButtonProps, List, Text} from 'react-native-paper';
import {FlatList, View} from 'react-native';
import {WorkoutItemAttrs} from '../../../realm/objects/WorkoutItem';
import {useMakeStyles} from '../../../hooks/useMakeStyles';

export type WorkoutTimerCounterProps = {items: WorkoutItemAttrs[]};
type TimerMode = 'exercise' | 'break' | 'stopped';

const INTERVAL = 100;
const formatTime = (value: number) => {
  if (value <= 0) {
    return '00:00';
  }
  const basedTime = 60;
  const seconds = value % basedTime;
  const minutes = value >= basedTime ? (value - seconds) / basedTime : 0;
  const displayedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const displayedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${displayedMinutes}:${displayedSeconds}`;
};

export const WorkoutTimer = ({items}: WorkoutTimerCounterProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentSeries, setCurrentSeries] = useState(1);
  const [timerMode, setTimerMode] = useState<TimerMode>('stopped');
  const [time, setTime] = useState(0);
  const intervalId = useRef<any>(null);
  const {styles} = useMakeStyles(({layout, colors}) => ({
    itemShadowed: {
      opacity: 0.5,
    },
    currentExercise: {
      marginBottom: layout.gap,
      paddingBottom: layout.gap,
      borderBottomWidth: 1,
      borderBottomColor: colors.outline,
    },
    timeWrapper: {
      alignSelf: 'center',
      width: 200,
      height: 200,
      borderRadius: 100,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      borderWidth: 5,
      borderColor: colors.outline,
      marginBottom: layout.gap,
    },
    timerButton: {
      alignSelf: 'center',
    },
  }));
  const currentExercise = items[currentExerciseIndex];
  const set = currentExercise.sets[0];
  const exerciseRender = useMemo(() => {
    const handleSetExerciseMode = () => setTimerMode('exercise');
    const buttonProps: Partial<ButtonProps> = {
      style: styles.timerButton,
      mode: 'contained',
    };

    switch (timerMode) {
      case 'exercise':
        return {
          button: <Button {...buttonProps}>Done</Button>,
          title: 'Pump It!',
        };
      case 'break':
        return {
          button: <Button {...buttonProps}>Skip</Button>,
          title: 'Break',
        };
      case 'stopped':
      default:
        return {
          button: (
            <Button {...buttonProps} onPress={handleSetExerciseMode}>
              Start
            </Button>
          ),
          title: 'Ready?',
        };
    }
  }, [timerMode, setTimerMode]);

  useEffect(() => {
    let tempTime = 0;

    switch (timerMode) {
      case 'exercise': {
        clearInterval(intervalId.current);
        tempTime = time;
        intervalId.current = setInterval(() => {
          setTime((tempTime += 1));
        }, INTERVAL);
        break;
      }
      case 'break': {
        setTime(currentExercise.breakSeconds);
        intervalId.current = setInterval(() => {
          setTime(time - 1);
        }, INTERVAL);
        break;
      }

      case 'stopped':
      default: {
        clearInterval(intervalId.current);
        break;
      }
    }
  }, [timerMode]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  return (
    <>
      <View style={styles.currentExercise}>
        <Text variant="titleLarge">{currentExercise.exercise.title}</Text>
        <Text>{`${set.weightKg}kg, ${set.reps} reps`}</Text>
        <View style={styles.timeWrapper}>
          <Text variant="headlineSmall">{exerciseRender.title}</Text>
          <Text variant="displaySmall">{formatTime(time)}</Text>
          <Text variant="headlineSmall">{`${currentSeries}/${set.series}`}</Text>
        </View>
        {exerciseRender.button}
      </View>
      <FlatList
        data={items}
        renderItem={({item: {exercise, sets}, index}) => {
          const data = sets[0];

          return (
            <List.Item
              style={
                index !== currentExerciseIndex ? styles.itemShadowed : undefined
              }
              title={exercise.title}
              description={`${data.series} series | ${data.reps} reps | ${data.weightKg}kg`}
            />
          );
        }}
      />
    </>
  );
};
