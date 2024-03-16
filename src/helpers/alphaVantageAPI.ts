const ALPHA_VANTAGE_API = "https://www.alphavantage.co/query";
const API_KEY = "DCYKY1IH6L59VWM1"; //DCYKY1IH6L59VWM1 PUY6176MDVR7QK35

export async function getAlphaVantage(symbol:string, interval:string) {
  const response = await fetch(
    ALPHA_VANTAGE_API +
      `?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`
  );
  const data = await response.json();

  return data
}
