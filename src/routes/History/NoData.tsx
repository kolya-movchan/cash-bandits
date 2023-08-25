import classNames from 'classnames'

import { useSelectorData } from '../../hooks/hooks'

type Props = {
  isFullMode: boolean
}

export const NoData: React.FC<Props> = ({ isFullMode }) => {
  const { darkMode } = useSelectorData()

  if (isFullMode) {
    return <></>
  }
  return (
    <div className="no-data">
      <span
        className={classNames('no-data__text', {
          'no-data__text--dark-mode': darkMode,
        })}
      >
        No Data Avaliable
      </span>
    </div>
  )
}

export default NoData
