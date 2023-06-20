import React from 'react';
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';

export function Home() {
  const { balance, income, expenses } = useAppSelector(state => state.balance);

  return (
    <Container fluid className="balance-container d-flex flex-column">
      <div className="d-flex flex-column justify-content-center align-items-center h-50 p-3">
        <h1 className="display-1 text-center">Balance</h1>
        <h2 className="display-2 text-center balance-container__balance balance-container__balance--total">{balance}</h2>
      </div>

      <div className="d-flex justify-content-around total-container">
        <div className="d-flex flex-column justify-content-center align-items-center h-50">
          <h1 className="display-5 text-center">Total Income</h1>
          <h3 className="display-4 text-center balance-container__balance balance-container__balance--income">{income}</h3>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center h-50">
          <h1 className="display-5 text-center">Total Expenses</h1>
          <h3 className="display-4 text-center balance-container__balance balance-container__balance--expenses">{expenses}</h3>
        </div>
      </div>
    </Container>
  );
}
