import { render, screen } from '@testing-library/react';
import Header from './CoinHeader';

test('renders learn react link', () => {
  render(<Header />);
  const element = screen.getByText(/Coin/i);
  expect(element).toBeInTheDocument();
});
