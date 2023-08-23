import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { ChartComponent } from '../../components/ChartComponent/ChartComponent';
import { MoneyCard } from '../../components/MoneyCard/MoneyCard';
import { TransactionForm } from '../TransactionForm';

export function Dashboard() {
  const { balance, income, expenses } = useAppSelector((state) => state.balance);
  const [isFormActive, setIsFormActive] = useState(false);

  const showForm = () => {
    setIsFormActive(!isFormActive);
  };

  // useEffect(() => {
  //   document.body.style.overflow = 'hidden'
  // }, [])

  return (
    <>
      <div className="top-controls">
        <h1 className="section-title">Dashboard</h1>
        <button>
          <img
            src="./add.svg"
            alt="add transaction icon"
            className="add-trans"
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
          <div className="editForm">
            <TransactionForm onHide={setIsFormActive} />
          </div>
        )}

        <div style={{ display: 'flex', maxHeight: '400px', maxWidth: '400px', gap: '50px', justifyContent: 'center'}}>
          <ChartComponent />
          <ChartComponent />
        </div>
      </div>
    </>
  );
}
