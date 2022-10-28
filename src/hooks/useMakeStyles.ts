import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {AppTheme, useAppTheme} from '../layout/theme';

export function useMakeStyles<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>,
>(
  getStyles: (theme: AppTheme) => T | StyleSheet.NamedStyles<T>,
): {styles: T; theme: AppTheme} {
  const appTheme = useAppTheme();
  const styles = useMemo(
    () => StyleSheet.create(getStyles(appTheme)),
    [appTheme],
  );

  return {styles, theme: appTheme};
}
