import React, {memo, useEffect, useState} from 'react';
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
import darkMode from '../../reducers/darkMode';
import { useLocation } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const today = new Date();
const daysBeforeNow = 4;

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

export const ChartComponent = memo(() => {
  const { history } = useAppSelector((state) => state.balance);
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const location = useLocation();

  const [isSwitchModeRender, setIsSwitchModeRender] = useState(false);

  useEffect(() => {
    setIsSwitchModeRender(true);
  }, [darkMode])

  useEffect(() => {
    setIsSwitchModeRender(false);
  }, [history])

  // console.log('isDataUpdateRender', isSwitchModeRender)

  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: false,
      }
    },
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#fff' : '#a2adba',
          usePointStyle: true,
          boxHeight: 10,
          font: {
            size: 16,
          },
        },
      },
  
      title: {
        display: true,
        text: 'Total Income and Expenses Statistics',
        align: 'start',
        font: {
          size: 20,
        },
        color: darkMode ? '#fff' : '#1b212d'
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

  const modifiedOptions = isSwitchModeRender ? { ...options, animations: false } : options;

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
        pointRadius: 5,
      },
      {
        label: 'Expenses',
        data: dailyExpensesBalances,
        borderColor: '#fd5c63',
        backgroundColor: '#fd5c63',
        borderCapStyle: 'round',
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  return <Line options={modifiedOptions} data={data} className="chartData" width={400} height={300}/>;
})
