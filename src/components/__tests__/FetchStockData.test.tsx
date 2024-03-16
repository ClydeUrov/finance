import { getAlphaVantage } from "../../helpers/alphaVantageAPI";
import { fetchStockData } from "../../helpers/apiReq";

jest.mock("../../helpers/alphaVantageAPI");

describe("fetchStockData function", () => {
  it('returns Promise<StockInfo | null>', async () => {
    // Mocking the resolved value of getAlphaVantage
    (getAlphaVantage as jest.Mock).mockResolvedValue({
      "Meta Data": {
        "1. Information": "Intraday (5min) open, high, low, close prices and volume",
        "2. Symbol": "AAPL",
        "3. Last Refreshed": "2024-03-15 19:55:00",
        "4. Interval": "5min",
        "5. Output Size": "Compact",
        "6. Time Zone": "US/Eastern"
      },
      "Time Series (5min)": {
        "2024-03-15 19:55:00": {
          "1. open": "191.6000",
          "2. high": "191.9900",
          "3. low": "191.5500",
          "4. close": "191.8800",
          "5. volume": "12685"
        }
      }
    });

    const symbol = 'AAPL';
    const result = await fetchStockData(symbol);

    // Checking that the function returns a Promise
    expect(result).toBeInstanceOf(Promise);
    await expect(result).resolves.toMatchObject({
      symbol: expect.any(String),
      times: expect.any(Array),
      prices: expect.any(Array),
    });
  });

  it('returns null when getAlphaVantage fails', async () => {
    // Installing a mock for getAlphaVantage, which throws an error
    (getAlphaVantage as jest.Mock).mockRejectedValue(new Error('Failed to fetch data'));

    const symbol = 'AAPL';
    const result = await fetchStockData(symbol);

    // Checking that the function returns null
    expect(result).toBeNull();
  });
});
