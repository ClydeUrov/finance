import { useCallback, useEffect, useState } from 'react';
import StockCard from './StockCard';
import { fakeStock } from '../helpers/fakeStock';
import { Flex } from '@radix-ui/themes';
import { StockInfo } from '../types/types';
import { fetchStockData } from '../helpers/apiReq';
import Loader from './Loader';
import { act } from 'react-dom/test-utils';

const SYMBOLS = [
  "NVDA",
  "MCD",
  "AAPL",
  "MSFT"
];

const StockPriceWidget = () => {
  const [stockInfo, setStockInfo] = useState<StockInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStockDataCallback = useCallback(async () => {
    try {
      // const updatedStockPrice = await Promise.all(SYMBOLS.map(fetchStockData));
      // const validStockPrice = updatedStockPrice.filter(stock => stock !== null) as StockInfo[];
      const fakeStocksInfo = Object.entries(fakeStock).map(([symbol, stockData]) => ({
        symbol,
        times: stockData.times,
        prices: stockData.prices,
      }));
      setStockInfo([...fakeStocksInfo]); //...validStockPrice,
    } catch (error) {
      console.error('Failed to fetch stock price:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStockDataCallback();
  }, [fetchStockDataCallback]);

  return (
    <div className='mt-10 mx-10'>
      {loading ? (
        <Loader />
      ) : (
        stockInfo.length ? (
          <Flex className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
            {stockInfo.map((stock, index) => (
              <StockCard key={index} stock={stock} />
            ))}
          </Flex>
        ) : (
          <p className='text-2xl'>List of Stocks is empty</p>
        )
      )}
    </div>
  )
}

export default StockPriceWidget;