import React from 'react';
import { useAppSelector } from '../../app/hooks';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        // pointStyleWidth: 30,
        boxHeight: 10,
        // This more specific font property overrides the global property
        font: {
          size: 16,
        },
        // padding: 40,
      },
      // position
    },

    title: {
      display: true,
      text: 'Total Income and Expenses Statistics',
      align: 'start',
      font: {
        size: 20,
      },
      color: '#1b212d'
    },
  },

  scales: {
    x: {
      ticks: {},
    },
    y: {
      grid: {
        display: false, // Disable y-axis grid lines
      },
      ticks: {
        callback: (value: number) => {
          if (value >= 1000) {
            return `${(value / 1000)}K`;
          }
          return value;
        },
      },
    },
  },

  // borderColor: 'red', // Set the border color
  // borderWidth: 1,
};

const today = new Date();
const daysBeforeNow = 2;

const dateOptions = { month: 'short', day: 'numeric', };

const labels: string[] = [];

for (let i = daysBeforeNow; i >= 0; i--) {
  const currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - i
  );

  labels.push(currentDate.toLocaleDateString('en-US', dateOptions));
}

export const ChartComponent = () => {
  const { history } = useAppSelector((state) => state.balance);

  // console.log(history[0]);

  const dailyIncomeBalances = labels.map((labelDate) => {
    const transactionsOnDate = history.filter(
      (trans) =>
        trans.type === 'income' &&
        new Date(trans.time).toLocaleDateString('en-US', dateOptions) === labelDate
    );
    const totalBalance = transactionsOnDate.reduce((sum, inc) => sum + inc.amount, 0);
    return totalBalance;
  });

  const dailyExpensesBalances = labels.map((labelDate) => {
    const transactionsOnDate = history.filter(
      (trans) =>
        trans.type === 'expenses' &&
        new Date(trans.time).toLocaleDateString('en-US', dateOptions) === labelDate
    );
    const totalBalance = transactionsOnDate.reduce((sum, inc) => sum + inc.amount, 0);
    return totalBalance;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: dailyIncomeBalances,
        borderColor: '#00A86B',
        backgroundColor: '#00A86B',
        pointHoverBackgroundColor: '#1B4D3E',
        borderCapStyle: 'round',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: dailyExpensesBalances,
        borderColor: '#fd5c63',
        backgroundColor: '#fd5c63',
        borderCapStyle: 'round',
        tension: 0.4,
      },
    ],
  };

  return <Line options={options} data={data} className="chartData" width={400} height={300}/>;
};
