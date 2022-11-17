import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Button, ButtonProps, List, Text} from 'react-native-paper';
import {Alert, FlatList, View} from 'react-native';
import notifee from '@notifee/react-native';
import BackgroundTimer from 'react-native-background-timer';
import {useNavigation} from '@react-navigation/native';
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
  const {addListener, dispatch} = useNavigation();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSeries, setCurrentSeries] = useState(1);
  const [timerMode, setTimerMode] = useState<TimerMode>('stopped');
  const [time, setTime] = useState(0);
  const isFinished = useRef(false);
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
  const currentSet = currentExercise.sets[0];
  const handleSetExerciseMode = useCallback(() => {
    isFinished.current = false;
    setTimerMode('exercise');
  }, []);
  const handleSetBreakMode = useCallback(() => {
    cancelAllNotifications();
    setTimerMode('break');
  }, []);
  const handleSkipBreak = useCallback(() => {
    setTimerMode('exercise');
    setCurrentSeries(currentSeries < currentSet.series ? currentSeries + 1 : 1);

    if (currentSeries === currentSet.series) {
      if (currentExerciseIndex === items.length - 1) {
        setCurrentExerciseIndex(0);
        setTime(0);
        setTimerMode('stopped');
        isFinished.current = true;
        Alert.alert('Finished!');
      } else {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      }
    }
  }, [currentSeries, currentExerciseIndex, currentSet]);
  const endBreakNotification = useCallback(async () => {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'break-end',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'Break has been finished.',
      body: `${currentExercise.exercise.title} | ${currentSeries}/${currentSet.series}`,
      android: {
        channelId,
        sound: 'default',
      },
    });
  }, [currentSeries, currentExercise, currentSet]);

  const cancelAllNotifications = useCallback(() => {
    notifee.cancelAllNotifications();
  }, []);
  const isWorkoutStarted =
    time > 0 ||
    timerMode !== 'stopped' ||
    currentSeries > 1 ||
    currentExerciseIndex > 0;
  const exerciseRender = useMemo(() => {
    const buttonProps: Partial<ButtonProps> = {
      style: styles.timerButton,
      mode: 'contained',
    };

    switch (timerMode) {
      case 'exercise':
        return {
          button: (
            <Button {...buttonProps} onPress={handleSetBreakMode}>
              Done
            </Button>
          ),
          title: 'Pump It!',
        };
      case 'break':
        return {
          button: (
            <Button {...buttonProps} onPress={handleSkipBreak}>
              Skip
            </Button>
          ),
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
        BackgroundTimer.stopBackgroundTimer();
        tempTime = 0;
        setTime(0);
        BackgroundTimer.runBackgroundTimer(() => {
          setTime((tempTime += 1));
        }, INTERVAL);
        break;
      }
      case 'break': {
        BackgroundTimer.stopBackgroundTimer();
        setTime(currentExercise.breakSeconds);
        tempTime = currentExercise.breakSeconds;
        BackgroundTimer.runBackgroundTimer(() => {
          setTime((tempTime -= 1));
        }, INTERVAL);
        break;
      }
      case 'stopped':
      default: {
        BackgroundTimer.stopBackgroundTimer();
        break;
      }
    }
  }, [timerMode]);

  useEffect(() => {
    if (timerMode === 'break' && time <= 0) {
      handleSkipBreak();
      endBreakNotification();
    }
  }, [time]);

  useEffect(
    () =>
      addListener('beforeRemove', e => {
        if (isWorkoutStarted && !isFinished.current) {
          e.preventDefault();

          Alert.alert(
            'Stop workout?',
            'Are You sure? Your current progress will be lost',
            [
              {
                text: "I'm stay",
                style: 'cancel',
                onPress: () => {},
              },
              {
                text: 'Leave it',
                style: 'destructive',
                onPress: () => dispatch(e.data.action),
              },
            ],
          );
        }
      }),
    [isWorkoutStarted, isFinished],
  );

  useEffect(() => {
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, []);

  return (
    <>
      <View style={styles.currentExercise}>
        <Text variant="titleLarge">{currentExercise.exercise.title}</Text>
        <Text>{`${currentSet.weightKg}kg, ${currentSet.reps} reps`}</Text>
        <View style={styles.timeWrapper}>
          <Text variant="headlineSmall">{exerciseRender.title}</Text>
          <Text variant="displaySmall">{formatTime(time)}</Text>
          <Text variant="headlineSmall">{`${currentSeries}/${currentSet.series}`}</Text>
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
