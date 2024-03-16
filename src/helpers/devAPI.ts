import axios from 'axios';

const API_TOKEN='506|3llJApOUwrAe30lFoiZvBcdytQEGHFDsFCo7tKH9'

export async function getDevApi(symbol: string, interval: string) {
  try {
    const response = await axios.get(`https://devapi.ai/api/stocks/${symbol}?interval=${interval}`, {
      headers: {
        "Authorization": `Bearer ${API_TOKEN}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error when making a request to DevAPI:', error);
    throw error;
  }
}