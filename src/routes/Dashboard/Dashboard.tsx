import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { ChartComponent } from '../../components/ChartComponent/ChartComponent';
import { MoneyCard } from '../../components/MoneyCard/MoneyCard';
import { TransactionForm } from '../TransactionForm';

export function Dashboard() {
  const { balance, income, expenses } = useAppSelector((state) => state.balance);
  const { darkMode } = useAppSelector((state) => state.darkMode);

  const [isFormActive, setIsFormActive] = useState(false);

  const showForm = () => {
    setIsFormActive(!isFormActive);
  };

  const location = useLocation();
  console.log(location);

  return (
    <>
      <div className="top-controls">
        <h1
          className={classNames('section-title', {
            'section-title--dark-mode': darkMode,
          })}
        >
          Dashboard
        </h1>
        <button>
          <img
            src="./add.svg"
            alt="add transaction icon"
            className={classNames('add-trans', { 'add-trans--dark-mode': darkMode })}
            onClick={() => showForm()}
          />
        </button>
      </div>

      <div className="finance-data">
        <div className="finance-cards">
          <MoneyCard title="Total balance" amount={balance} icon="./wallet-total.svg" />
          <MoneyCard title="Total income" amount={income} icon="./wallet-plus.svg" />
          <MoneyCard title="Total expenses" amount={expenses} icon="./wallet-minus.svg" />
        </div>
        {isFormActive && (
          <div className={classNames('editForm', { 'editForm--dark-mode': darkMode })}>
            {' '}
            <TransactionForm onHide={setIsFormActive} />
          </div>
        )}
        <ChartComponent />
      </div>
    </>
  );
}
