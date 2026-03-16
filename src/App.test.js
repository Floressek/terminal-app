import { render, screen } from '@testing-library/react';
import App from './App';

test('renders terminal with welcome message', () => {
  render(<App />);
  expect(screen.getByText(/Welcome to Szymon Florek/i)).toBeInTheDocument();
});

test('renders input field', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});
