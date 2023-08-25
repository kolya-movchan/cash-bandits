import { memo, useLayoutEffect, useState } from 'react'
import { useSelectorData } from '../../hooks/hooks'

import { Line } from 'react-chartjs-2'
import { prepareChartData } from '../../utils/chartjs.config'

export const ChartComponent = memo(() => {
  const { darkMode, history, add, edit } = useSelectorData()

  const { options, data } = prepareChartData(darkMode, history)

  const [prevHistory, setPrevHistory] = useState(history)

  useLayoutEffect(() => {
    if (history !== prevHistory) {
      setPrevHistory(history)
    }
  }, [history, prevHistory])

  const modifiedOptions =
    history === prevHistory ? { ...options, animations: false } : options

  console.log(modifiedOptions.animations.valueOf)

  return (
    <Line
      options={modifiedOptions}
      data={data}
      className="chartData"
      width={400}
      height={300}
    />
  )
})
