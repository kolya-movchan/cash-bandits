import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { History } from '../types/Reducer'
import { calculateDailyBalances } from './calculations'
export const prepareChartData = (darkMode: boolean, history: History[]) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const today = new Date()
  const daysBeforeNow = 4

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  }

  const labels: string[] = []

  for (let i = daysBeforeNow; i >= 0; i--) {
    const currentDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - i
    )

    labels.push(currentDate.toLocaleDateString('en-US', dateOptions))
  }

  const options = {
    responsive: true,
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: false,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#fff' : '$link-color-light',
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
        color: darkMode ? '#fff' : '$link-color-light-hover',
      },
    },

    scales: {
      x: {
        ticks: {},
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: (value: number) => {
            if (value >= 1000) {
              return `${value / 1000}K`
            }
            return value
          },
        },
      },
    },
  }

  const dailyIncomeBalances = calculateDailyBalances(
    history,
    'income',
    labels,
    dateOptions
  )
  const dailyExpensesBalances = calculateDailyBalances(
    history,
    'expenses',
    labels,
    dateOptions
  )

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
  }

  return { options, data }
}
