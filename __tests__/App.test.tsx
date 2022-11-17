/**
 * @format
 */

import 'react-native';
import React from 'react';
import '@testing-library/jest-native/extend-expect';
import {render, screen, waitFor} from '@testing-library/react-native';
import {App} from '../src/App';

jest.mock('react-native-background-timer', () => {});
jest.mock('@notifee/react-native', () => ({
  addListener: () => jest.fn(),
}));

it('renders correctly', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText('Plans!')).not.toBeEmptyElement();
  });
});
