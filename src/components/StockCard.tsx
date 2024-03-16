import { Avatar, Card, Inset, Strong, Text } from "@radix-ui/themes";
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
    // const month = date
    //   .toLocaleString("default", { month: "short" })
    //   .slice(0, 3);
    // const day = date.getDate();
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
    <Card className='border-2 rounded-xl p-3 shadow-xl hover:shadow-2xl' data-testid="stock-card">
      <div className="flex gap-5 ml-5 mb-5">
        {icon && (
          <Avatar
            width={40}
            height={40}
            radius="full"
            fallback="I"
            src={icon}
            color="indigo"
            className="object-contain flex items-center justify-center"
          />
        )}
        <div className="flex flex-col place-items-start">
          <Strong className="text-2xl">{symbol}</Strong>
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
      <Inset className='p-2 pr-3 flex justify-center'>
        <ChartArea labels={labels} prices={prices} increasing={percentChange >= 0} />
      </Inset>
      <div className='flex px-10 justify-between py-2'>
        <Text as='p' size="6" className='text-left'>
          <Strong>{highestPrice}</Strong>
          <span className='text-base text-gray-400'>Max Price Increase</span>
        </Text>
        <Text as="p" size="5" className={`text-right ${percentChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
          <Strong>{percentChange.toFixed(2)} %</Strong>
          <span className='text-base text-gray-400'>{percentChange > 0 ? 'Grows' : 'Decline'}</span>
        </Text>
      </div>
    </Card>
  );
};

export default StockCard;
