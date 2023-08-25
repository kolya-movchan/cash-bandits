import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames'

type Props = {
  to: string
  iconSrc?: string
  text: string
  darkMode: boolean
}

export const CustomNavLink: React.FC<Props> = ({
  to,
  iconSrc,
  text,
  darkMode,
}) => {
  const location = useLocation()

  return (
    <NavLink
      to={to}
      className={classNames('nav__link', {
        'nav__link--active': location.pathname === to,
        'nav__link--dark-mode': darkMode && location.pathname !== to,
      })}
    >
      <img
        src={iconSrc}
        alt={`${text} icon`}
        className={classNames('icon-dash', {
          'icon-dash--dark-mode': darkMode && location.pathname !== to,
        })}
      />
      {text}
    </NavLink>
  )
}
