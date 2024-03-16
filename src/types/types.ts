export interface StockInfo {
  symbol: string;
  times: number[];
  prices: number[];
}

export interface RawData {
  "Meta Data"?: {
    "2. Symbol"?: string;
  };
  "Time Series (5min)"?: Record<string, {
    "1. open"?: string;
  }>;
}

export interface ChartAreaProps {
  labels: string[],
  prices: number[], 
  increasing: boolean
}