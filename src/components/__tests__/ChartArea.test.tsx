import { render, screen } from '@testing-library/react';
import ChartArea from '../ChartArea';
import '@testing-library/jest-dom';

describe('ChartArea component', () => {
  const defaultProps = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    prices: [10, 20, 30, 40],
    increasing: true,
  };

  test('renders chart with correct data', () => {
    render(<ChartArea {...defaultProps} />);
    
    const chartElement = screen.getByTestId('chart-area');
    expect(chartElement).toBeInTheDocument();
  });

});