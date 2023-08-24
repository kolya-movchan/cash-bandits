import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Dashboard, History, NotFound } from '../../routes';
// import { Navigation } from '../Navigation';
import { TransactionForm } from '../../routes/TransactionForm';
import { DataMenu } from '../DataMenu/DataMenu';
import { ArrowContainer, Popover } from 'react-tiny-popover';

export function App() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <>
      <div className="app">
        <div className="side-pannel">
          <div className="side-container">
            <a href="#" className="logo-container">
              <img src="./logo.jpg" className="logo" alt="mopobank logo" />
              <h2 className="title" style={{ textDecoration: 'none' }}>
                mopoBank
              </h2>
            </a>
          </div>

          <div className="nav">
            <div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames('nav__link', { 'nav__link--active': isActive })
                }
              >
                <img src="./dashboard.svg" alt="dashboard icon" className="icon-dash" />
                Dashboard
              </NavLink>
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  classNames('nav__link', { 'nav__link--active': isActive })
                }
              >
                <img
                  src="./transactions.svg"
                  alt="dashboard icon"
                  className="icon-dash"
                />
                Transactions
              </NavLink>
            </div>
            <div>
              <Link
                // to="/"
                // target='_blank'
                className="nav__link"
              >
                <img src="./video.svg" alt="video icon" className="icon-dash" />
                Demo Video
              </Link>
              <Link
                to="https://www.linkedin.com/in/klmovchan/"
                target="_blank"
                className="nav__link"
              >
                <img
                  src="./question-mark.svg"
                  alt="question mark icon"
                  className="icon-dash"
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
