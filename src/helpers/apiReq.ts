import { RawData, StockInfo } from '../types/types';
import { getAlphaVantage } from './alphaVantageAPI';
// import { getDevApi } from '../helpers/devAPI';

const INTERVAL = "5min";

export const fetchStockData = async (symbol: string): Promise<StockInfo | null> => {
  try {
    let rawData: RawData = {};
    try {
      rawData = await getAlphaVantage(symbol, INTERVAL);
    } catch (error) {
      console.error(`Failed to fetch data for symbol ${symbol}:`, error);
      return null;
    }
    if (!rawData || !rawData["Meta Data"] || !rawData["Time Series (5min)"]) {
      console.error(`Received empty or invalid data for symbol ${symbol}`);
      return null;
    }

    const timeSeries = rawData["Time Series (5min)"];
    const times = [];
    const prices = [];

    for (const timestamp in timeSeries) {
      const data = timeSeries[timestamp];
      if (data["1. open"]) {
        times.push(Date.parse(timestamp));
        prices.push(parseFloat(data["1. open"]));
      }
    }

    return {
      symbol,
      times,
      prices,
    };
  } catch (error) {
    console.error(`Failed to fetch data for symbol ${symbol}:`, error);
    return null;
  }
};