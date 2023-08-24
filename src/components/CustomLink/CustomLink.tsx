import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

type Props = {
  to: string;
  iconSrc: string;
  text: string;
};

export const CustomLink: React.FC<Props> = ({ to, iconSrc, text }) => {
  const { darkMode } = useAppSelector((state) => state.darkMode);

  return (
    <Link
      to={to}
      target='_blank'
      className={classNames('nav__link ', {
        'nav__link--dark-mode': darkMode,
      })}
    >
      <img
        src={iconSrc}
        alt={`${text} icon`}
        className={classNames('icon-dash', {
          'icon-dash--dark-mode': darkMode,
        })}
      />
      {text}
    </Link>
  );
};
