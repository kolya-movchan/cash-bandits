import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Dashboard, History, NotFound } from '../../routes';
// import { Navigation } from '../Navigation';
import { TransactionForm } from '../../routes/TransactionForm';
import { DataMenu } from '../DataMenu/DataMenu';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { switchMode } from '../../reducers/darkMode';

export function App() {
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const dispatch = useAppDispatch();

  const location = useLocation();

  const [isSideBarDisabled, setIsSideBarDisabled] = useState(false);
  const [f, setF] = useState(false);

  setTimeout(() => {
    setF(true);
  }, 1000);

  setTimeout(() => {
    setIsSideBarDisabled(true);
  }, 1800);

  return (
    <>
      <div className={classNames('app', { 'app--dark-mode': darkMode })}>
        <div
          className={classNames(
            'side-pannel',
            { 'side-pannel--dark-mode': darkMode }
            // {'side-pannel--x': f},
            // {'side-pannel--x2': isSideBarDisabled},
          )}
        >
          <div className="side-container">
            {/* ? */}
{/* 
            <div className="custom-menu">
              <button type="button" className="">
                <i className="fa fa-bars"></i>
                <span className="sr-only">Toggle Menu</span>
              </button>
            </div> */}

            {/* ? */}
            <a href="#" className="logo-container">
              <img
                src="./logo.jpg"
                className="logo logo--dark-mode"
                alt="mopobank logo"
              />
              <h2
                className={classNames('title', { 'title--dark-mode': darkMode })}
                style={{ textDecoration: 'none' }}
              >
                mopoBank
              </h2>
            </a>
          </div>

          <div className="nav">
            <div>
              <div style={{ marginBottom: '20px' }}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    classNames(
                      'nav__link',
                      { 'nav__link--active': isActive },
                      {
                        'nav__link--dark-mode': darkMode && !isActive,
                      }
                    )
                  }
                >
                  <img
                    src="./dashboard.svg"
                    alt="dashboard icon"
                    className={classNames('icon-dash', {
                      'icon-dash--dark-mode': darkMode && location.pathname !== '/',
                    })}
                  />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/transactions"
                  className={({ isActive }) =>
                    classNames(
                      'nav__link',
                      { 'nav__link--active': isActive },
                      {
                        'nav__link--dark-mode': darkMode && !isActive,
                      }
                    )
                  }
                >
                  <img
                    src="./transactions.svg"
                    alt="dashboard icon"
                    className={classNames('icon-dash', {
                      'icon-dash--dark-mode':
                        darkMode && location.pathname !== '/transactions',
                    })}
                  />
                  Transactions
                </NavLink>
              </div>

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
                      dispatch(switchMode(darkMode));
                    }}
                  />
                </label>
              </div>
            </div>
            <div>
              <Link
                // to="/"
                // target='_blank'
                className={classNames('nav__link ', {
                  'nav__link--dark-mode': darkMode,
                })}
              >
                <img
                  src="./video.svg"
                  alt="video icon"
                  className={classNames('icon-dash', {
                    'icon-dash--dark-mode': darkMode,
                  })}
                />
                Demo Video
              </Link>
              <Link
                to="https://www.linkedin.com/in/klmovchan/"
                target="_blank"
                className={classNames('nav__link ', {
                  'nav__link--dark-mode': darkMode,
                })}
              >
                <img
                  src="./question-mark.svg"
                  alt="question mark icon"
                  className={classNames('icon-dash', {
                    'icon-dash--dark-mode': darkMode,
                  })}
                  // className="icon-dash"
                />
                Ask Me
              </Link>
            </div>{' '}
          </div>
        </div>

        <Routes>
          <Route path="/" element={<DataMenu />} />
          <Route path="/transactions" element={<History />} />
          {/* <Route path="/history" element={<History />} />
        <Route path="/add" element={<TransactionForm />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} /> */}
        </Routes>

        <ToastContainer position="bottom-left" />
      </div>
    </>
  );
}
