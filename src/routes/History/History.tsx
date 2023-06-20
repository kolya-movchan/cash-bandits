import React from 'react';
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import uniqid from 'uniqid';

export function History() {
  const { history } = useAppSelector(state => state.balance);

  console.log(uniqid());

  return (
    <Container>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Balance</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
  
        <tbody>
          {history.map(transaction => {
            const { name, type, amount, currentBalance, time } = transaction;

            return (
              <tr className={type === 'income' ? 'table-success' : 'table-danger'} key={uniqid()}>
                <td>{name}</td>
                <td>{type}</td>
                <td>{type === 'expenses' && '-' }{amount}</td>
                <td>{currentBalance}</td>
                <td>{new Date(time).toLocaleString()}</td>
             </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  );
}
