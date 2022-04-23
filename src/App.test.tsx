import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const {container} = render(<App />);
  expect(container).toBeDefined();

  const button = screen.getByTestId('button');
  expect(button).toBeInTheDocument();
});
