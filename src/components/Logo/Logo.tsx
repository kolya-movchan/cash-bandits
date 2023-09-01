import classNames from 'classnames'
import { useSelectorData } from '../../hooks/hooks'

export function Logo() {
  const { darkMode } = useSelectorData()

  return (
    <div className="side-container">
      <a href="#" className="logo-container">
        <h2
          className={classNames('title', { 'title--dark-mode': darkMode })}
          style={{ textDecoration: 'none' }}
        >
          mopoBank
        </h2>
      </a>
    </div>
  )
}
