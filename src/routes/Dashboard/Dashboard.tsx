import classNames from 'classnames';
import { ChartComponent } from '../../components/ChartComponent/ChartComponent';
import { MoneyCard } from '../../components/MoneyCard/MoneyCard';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { control } from '../../reducers/form';
import { TransactionForm } from '../TransactionForm';
import { History } from '../../routes';

export const Dashboard = () => {
  const { balance, income, expenses } = useAppSelector((state) => state.balance);
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const { add, edit } = useAppSelector((state) => state.form);

  const dispatch = useAppDispatch();

  return (
    <div className="dashBoard">
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
            onClick={() => dispatch(control('addIsOn'))}
          />
        </button>
      </div>
      <div className="finance-data">
        <div className="finance-cards">
          <MoneyCard title="Total balance" amount={balance} icon="./wallet-total.svg" />
          <MoneyCard title="Total income" amount={income} icon="./wallet-plus.svg" />
          <MoneyCard title="Total expenses" amount={expenses} icon="./wallet-minus.svg" />
        </div>
        {add && !edit && (
          <div className={classNames('editForm', { 'editForm--dark-mode': darkMode })}>
            {' '}
            <TransactionForm />
          </div>
        )}
        <ChartComponent />
      </div>
      <History />
    </div>
  );
};
