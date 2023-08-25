import classNames from 'classnames'
import { useAppDispatch, useSelectorData } from '../../hooks/hooks'
import { switchMode } from '../../reducers/darkMode'

export const DarkMode = () => {
  const dispatch = useAppDispatch()
  const { darkMode } = useSelectorData()

  return (
    <div className="form-check form-switch">
      <label className="custom-control-label nav__dark-and-light">
        <span
          className={classNames('nav__mode ', {
            'nav__mode--dark-mode': darkMode,
          })}
        >
          Dark Mode
        </span>
        <input
          checked={darkMode}
          type="checkbox"
          className="form-check-input"
          onChange={() => {
            dispatch(switchMode(darkMode))
          }}
        />
      </label>
    </div>
  )
}
