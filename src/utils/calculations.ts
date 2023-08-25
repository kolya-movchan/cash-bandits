import { History } from '../types/Reducer'

export const formatNumber = (number: number) => {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function calculateDailyBalances(
  history: History[],
  type: string,
  labels: string[],
  dateOptions: Intl.DateTimeFormatOptions
) {
  return labels.map((labelDate) => {
    const transactionsOnDate = history.filter(
      (trans) =>
        trans.type === type &&
        new Date(trans.time).toLocaleDateString('en-US', dateOptions) === labelDate
    )
    const totalBalance = transactionsOnDate.reduce((sum, trans) => sum + trans.amount, 0)
    return totalBalance
  })
}

export const calculateTimeFormat = (time: string) => {
  const currentDate = new Date(time)

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  }

  const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions)
  const formattedTime = currentDate.toLocaleTimeString('en-US', timeOptions)

  return { formattedDate, formattedTime }
}
