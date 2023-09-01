import type { ChartData, ChartOptions } from 'chart.js'
import { memo, useEffect, useLayoutEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useSelectorData } from '../../hooks/hooks'
import { prepareChartData } from '../../utils/chartjs.config'

interface LineParameters {
  options: ChartOptions<'line'>
  data: ChartData<'line'>
}
export const ChartComponent = memo(() => {
  const { darkMode, history, add, edit } = useSelectorData()

  const { options, data }: LineParameters = prepareChartData(darkMode, history)

  const [prevHistory, setPrevHistory] = useState(history)

  useEffect(() => {
    if (history !== prevHistory) {
      setPrevHistory(history)
    }
  }, [history, prevHistory])

  /*@ts-ignore*/
  const modifiedOptions: ChartOptions<'line'> =
    history === prevHistory ? { ...options, animations: false } : options

  console.log(history === prevHistory, modifiedOptions)

  return (
    <Line
      options={modifiedOptions}
      data={data}
      className="chartData"
      width={1000}
      height={300}
    />
  )
})
