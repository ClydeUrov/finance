import { Line } from "react-chartjs-2";
import { ChartAreaProps } from "../types/types";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip,
  ChartOptions,
  ChartData,
  Filler,
} from "chart.js";

const ChartArea = ({ labels, prices, increasing }: ChartAreaProps) => {
  ChartJS.register(
    CategoryScale,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const data: ChartData<"line"> = {
    labels: labels,
    datasets: [
      {
        label: "Open Price",
        data: prices,
        pointRadius: 0,
        tension: 0.2,
        fill: true,
        backgroundColor: (context) => {
          const bgColor = [
            increasing === true
              ? "rgba(22, 163, 74, 0.7)"
              : "rgba(220, 38, 38, 0.7)",
            "rgba(255,255,255,1)",
          ];

          if (!context.chart.chartArea) {
            return;
          }
          const {
            ctx,
            data,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(0.5, bgColor[0]);
          gradientBg.addColorStop(1, bgColor[1]);
          return gradientBg;
        },
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 4,
          padding: 5,
        },
        border: {
          color: "rgba(0, 0, 0, 0.8)",
          display: true,
        },
      },
    },
  };

  return (
    <Line
      data={data}
      options={options}
      className="w-full h-full min-h-48 min-w-48"
      data-testid="chart-area"
    />
  );
};

export default ChartArea;
