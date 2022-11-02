import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {useMakeStyles} from '../../../hooks/useMakeStyles';
import {FieldError} from '../FieldError/FieldError';

export type InputWrapperProps = {
  bottomSpace?: number;
  children: ReactNode;
  error?: string;
};

export const FieldWrapper = ({
  bottomSpace = 1,
  children,
  error,
}: InputWrapperProps) => {
  const {styles} = useMakeStyles(({layout}) => ({
    wrapper: {
      marginBottom: layout.spacing(bottomSpace),
      flexGrow: 1,
    },
  }));

  return (
    <View style={styles.wrapper}>
      {children}
      {error && <FieldError>{error}</FieldError>}
    </View>
  );
};
