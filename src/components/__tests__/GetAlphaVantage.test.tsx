import { getAlphaVantage } from '../../helpers/alphaVantageAPI';


const fetchMock = require('jest-fetch-mock');
jest.setMock('node-fetch', fetchMock);

describe('getAlphaVantage function', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('returns data with correct RawData type', async () => {
    const mockResponse = {
      "Meta Data": {
        "2. Symbol": "AAPL"
      },
      "Time Series (5min)": {
        "2022-03-15 19:55:00": {
          "1. open": "191.6000",
        },
      }
    };
    fetchMock.mockResponse(JSON.stringify(mockResponse));

    const symbol = 'AAPL';
    const interval = '5min';
    const data = await getAlphaVantage(symbol, interval);

    expect(data).toEqual(expect.objectContaining({
      "Meta Data": expect.objectContaining({
        "2. Symbol": expect.any(String),
      }),
      "Time Series (5min)": expect.objectContaining({
        [expect.any(String)]: expect.objectContaining({
          "1. open": expect.any(String),
        }),
      }),
    }));
  });
});