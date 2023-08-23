import { Container } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { MoneyCard } from '../../components/MoneyCard/MoneyCard';

export function Dashboard() {
  const { balance, income, expenses } = useAppSelector((state) => state.balance);

  return (
    <>
    <h1 className='section-title'>
      Dashboard
    </h1>
      <div className="finance-cards">
        <MoneyCard title="Total balance" amount={balance} icon="./wallet-total.svg" />
        <MoneyCard title="Total income" amount={income} icon="./wallet-plus.svg" />
        <MoneyCard title="Total expenses" amount={expenses} icon="./wallet-minus.svg" />
      </div>
    </>
  );
}
