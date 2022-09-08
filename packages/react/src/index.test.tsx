import * as stories from './index.stories';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import React from 'react';

const { Basic: Thing } = composeStories(stories);

test('renders without crashing', () => {
  render(<Thing />);
  screen.getByText('Hi!');
});
