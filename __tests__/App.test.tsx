/**
 * @format
 */

import 'react-native';
import React from 'react';
import '@testing-library/jest-native/extend-expect';
import {render, screen} from '@testing-library/react-native';
import {App} from '../src/App';

it('renders correctly', () => {
  render(<App />);
  expect(screen.getByText('Go Sports!')).not.toBeEmptyElement();
});
