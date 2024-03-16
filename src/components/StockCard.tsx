import ChartArea from "./ChartArea";
import NvidiaIcon from "../icons/Nvidia.png";
import AppleIcon from "../icons/Apple.png";
import MicrosoftIcon from "../icons/Microsoft.png";
import McdonaldsIcon from "../icons/Mcdonalds.png";
import { StockInfo } from '../types/types';

const StockCard: React.FC<{ stock: StockInfo }> = ({ stock }) => {
  const { times, prices, symbol } = stock;

  const labels = times.map((time: number) => {
    const date = new Date(time * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  });

  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];
  const percentChange = ((lastPrice - firstPrice) / firstPrice) * 100;
  const highestPrice = Math.max(...prices);

  const getIconBySymbol = (symbol: string) => {
    switch (symbol) {
      case "NVDA":
        return NvidiaIcon;
      case "AAPL":
        return AppleIcon;
      case "MSFT":
        return MicrosoftIcon;
      case "MCD":
        return McdonaldsIcon;
      default:
        return null;
    }
  };

  const icon = getIconBySymbol(symbol);

  return (
    <div className='border-2 rounded-xl p-3 shadow-xl hover:shadow-2xl' data-testid="stock-card">
      <div className="flex gap-5 ml-5 mb-5">
        {icon && (
          <span className='object-contain flex items-center justify-center w-10 h-10'>
            <img src={icon} alt={symbol} />
          </span>
        )}
        <div className="flex flex-col place-items-start">
          <p className="text-2xl font-bold">{symbol}</p>
          <span>
            <a className="text-cyan-600 hover:text-cyan-800" href="/">
              View Dashboard
            </a>{" "}
            |{" "}
            <a className="text-cyan-600 hover:text-cyan-800" href="/">
              Add to Portfolio
            </a>
          </span>
        </div>
      </div>
      <div className='p-2 pr-3 flex justify-center min-h-[265px]'>
        <ChartArea labels={labels} prices={prices} increasing={percentChange >= 0} />
      </div>
      <div className='flex px-10 justify-between py-2'>
        <div className='text-left'>
          <p className='font-semibold'>{highestPrice}</p>
          <span className='text-base text-gray-400'>Max Price Increase</span>
        </div>
        <div className={`text-right ${percentChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
          <p className='font-semibold'>{percentChange.toFixed(2)} %</p>
          <span className='text-base text-gray-400'>{percentChange > 0 ? 'Grows' : 'Decline'}</span>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
