import { render, screen} from '@testing-library/react';
import StockCard from '../StockCard';
import { StockInfo } from '../../types/types';
import '@testing-library/jest-dom';


describe('StockCard component', () => {
  const stock: StockInfo = {
    symbol: 'NVDA',
    times: [1, 2, 3],
    prices: [100, 200, 300],
  };

  test('renders StockCard with correct data', () => {
    render(<StockCard stock={stock} />);
    
    const symbolElement = screen.getByText('NVDA');
    expect(symbolElement).toBeInTheDocument();

    const chartElement = screen.getByTestId('stock-card');
    expect(chartElement).toBeInTheDocument();

  });
});