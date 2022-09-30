import { render, screen } from '@testing-library/react';
import App from './App';

test('renders application', () => {
  render(<App />);
  const app = screen.getByRole('application');
  expect(app).toBeInTheDocument();
});
