import React, {ReactNode} from 'react';
import {Text} from 'react-native-paper';
import {useMakeStyles} from '../../../hooks/useMakeStyles';

export type FieldErrorProps = {children?: ReactNode | string};

export const FieldError = ({children}: FieldErrorProps) => {
  const {styles} = useMakeStyles(({colors}) => ({
    text: {
      color: colors.error,
    },
  }));

  return <Text style={styles.text}>{children}</Text>;
};
