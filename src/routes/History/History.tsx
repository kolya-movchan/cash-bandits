import React from 'react';
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { NavLink } from 'react-router-dom';
import { deleteIncome, deleteExpenses, History as TransactionHistory } from '../../reducers/balanceReducer';
import { useDispatch } from 'react-redux';

export function History() {
  const { history } = useAppSelector(state => state.balance);
  const dispatch = useDispatch();

  const handleTransactionDelete = (id: string, amount: number, type: string) => {
    if (type === 'income') {
      dispatch(deleteIncome({id, amount}));
    } else {
      dispatch(deleteExpenses({id, amount}));
    }
  }

  return (
    <Container>
      {history.length > 0 ? (
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
          {[...history]
          .sort((transactionA, transactionB) =>
            new Date(transactionA.time).getTime() - new Date(transactionB.time).getTime())
          .map(transaction => {
            const { name, type, amount, currentBalance, time, id } = transaction;

            return (
              <tr
                className={type === 'income' ? 'table-success' : 'table-danger'}
                key={id}
              >
                <td>{name}</td>
                <td>{type}</td>
                <td>{(type === 'expenses' && amount !== 0) && '-' }{amount.toLocaleString()}</td>
                <td>{currentBalance.toLocaleString()}</td>
                <td>{new Date(time).toLocaleString()}</td>
                <td>
                  <button className='tools'>
                    <NavLink
                      to="/add"
                      className="link"
                      state={{
                        id,
                        name,
                        amount,
                        type,
                      }}
                    >
                      <img src="./edit.svg" alt="edit" className='tools__logo' />
                    </NavLink>
                  </button>

                  <button
                    className='tools'
                    onClick={() => handleTransactionDelete(id, amount, type)}
                  >
                    <img src="./delete.svg" alt="delete" className='tools__logo' />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
        </table>
      ) : (
        <h1 className="display-5 text-center">No Records Yet</h1>
      )}
    </Container>
  );
}
