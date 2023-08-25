import classNames from 'classnames'
import { useSelectorData } from '../../hooks/hooks'
import { CustomLink } from '../CustomLink/CustomLink'
import { CustomNavLink } from '../CustomNavLink/CustomNavLink'
import { DarkMode } from '../DarkMode/DarkMode'
import { Logo } from '../Logo/Logo'

export const Sidebar = () => {
  const { darkMode } = useSelectorData()

  return (
    <div className={classNames('side-pannel', { 'side-pannel--dark-mode': darkMode })}>
      {<Logo />}

      <div className="nav">
        <div>
          <div style={{ marginBottom: '20px' }}>
            <CustomNavLink
              to="/"
              iconSrc="./dashboard.svg"
              text="Dashboard"
              darkMode={darkMode}
            />
            <CustomNavLink
              to="/transactions"
              iconSrc="./transactions.svg"
              text="Transactions"
              darkMode={darkMode}
            />
          </div>

          <DarkMode />
        </div>
        <div>
          <CustomLink to={'/'} iconSrc={'./video.svg'} text={'Demo Video'} />
          <CustomLink
            to={'https://www.linkedin.com/in/klmovchan/'}
            iconSrc={'./question-mark.svg'}
            text={'Ask Me'}
          />
        </div>{' '}
      </div>
    </div>
  )
}
