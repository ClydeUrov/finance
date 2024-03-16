import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('App component', () => {
  test('renders app', () => {
    render(<App />);
    
    const appElement = screen.getByTestId('app');
    expect(appElement).toBeInTheDocument();
  });
});
