import classNames from 'classnames';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { Dashboard, History, NotFound } from '../../routes';
// import { Navigation } from '../Navigation';
import { TransactionForm } from '../../routes/TransactionForm';
import { DeataMenu } from '../DataMenu/DeataMenu';

export function App() {
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                classNames('nav__link', { 'nav__link--active': isActive })
              }
            >
              <img src="./dashboard.svg" alt="dashboard icon" className='icon-dash'/>
              Dashboard
            </NavLink>

            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                classNames('nav__link', { 'nav__link--active': isActive })
              }
            >
              <img src="./transactions.svg" alt="dashboard icon" className='icon-dash'/>
              Transactions
            </NavLink>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<DeataMenu />} />
          <Route path="/transactions" element={<History />} />
          {/* <Route path="/history" element={<History />} />
        <Route path="/add" element={<TransactionForm />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} /> */}
        </Routes>

        {/* <div className="wallet">something</div> */}
      </div>
    </>
  );
}
