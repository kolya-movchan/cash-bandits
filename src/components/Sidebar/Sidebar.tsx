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
      <div className="nav">
        <div>

        {<Logo />}
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
        <div style={{ borderTop: `1px solid ${!darkMode ? '#1b212d' : '#a2adba'}` }}></div>
        <div>
          <CustomLink to={'https://github.com/kolya-movchan'} iconSrc={'./github.svg'} text={'Github'} />
          <CustomLink
            to={'https://www.linkedin.com/in/klmovchan/'}
            iconSrc={'./linkedin-logo-bold.svg'}
            text={'LinkedIn'}
          />
        </div>{' '}
      </div>
    </div>
  )
}
