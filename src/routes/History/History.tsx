import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import { useAppSelector } from '../../app/hooks';
import { TransactionForm } from '../TransactionForm';
import { Transaction } from '../../components/Transaction';

export type EditingTransaction = {
  id: string,
  name: string,
  amount: number,
  type: string,
}

export function History() {
  const { history } = useAppSelector(state => state.balance);

  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<EditingTransaction>();

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
                new Date(transactionB.time).getTime() - new Date(transactionA.time).getTime())
              .map(transaction => {

                return (
                  <Transaction
                    key={transaction.id}
                    transaction={transaction}
                    onEditInfo={setEditingTransaction}
                    onEdit={setIsEditVisible}
                  />
                )
            })}
          </tbody>
        </table>
      ) : (
        <h1 className="display-5 text-center">No Records Yet</h1>
      )}

      {(isEditVisible && editingTransaction) && (
        <div className="editForm">
          <TransactionForm updateData={{...editingTransaction, onHide: setIsEditVisible }} />
        </div>
      )}

      <ToastContainer position="bottom-left" />
    </Container>
  );
}
