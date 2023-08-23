import { useEffect, useLayoutEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import { useAppSelector } from '../../app/hooks';
import { TransactionForm } from '../TransactionForm';
import { Transaction } from '../../components/Transaction';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export type EditingTransaction = {
  id: string;
  name: string;
  amount: number;
  type: string;
};

export function History() {
  const { history } = useAppSelector((state) => state.balance);

  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<EditingTransaction>();
  const [isFullMode, setIsFullMode] = useState(false);
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.pathname.includes('/transaction')) {
      // document.body.style.overflow = 'scroll';
      setIsFullMode(false);
    } else {
      // document.body.style.overflow = 'hidden';
      setIsFullMode(true);
    }

    document.documentElement.scrollTop = 0;
  }, []);

  console.log(isFullMode);

  return (
    <>
      {!history.length ? (
        !isFullMode ? (
          <div className="no-data"><span className='no-data__text'>No Data Avaliable</span></div>
        ) : (
          <></>
        )
      ) : (
        <div
            className={classNames('history-container', {
              'history-container--full': !isFullMode,
              'history-container--sm': !isFullMode,
            })}
          >
            <div className="history-wrapper">
              <div className="history-top">
                <h2 className="section-heading">{`${
                  location.pathname.includes('/transaction') ? 'All' : 'Recent'
                } Transactions`}</h2>
                {isFullMode && (
                  <NavLink className="view-all" to="/transactions">
                    View all <span className="view-all__eagle">&gt;</span>
                  </NavLink>
                )}
              </div>
              {history.length > 0 && (
                <table className="table-history">
                  <thead>
                    <tr className="table-titles">
                      <th>Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Balance</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...history]
                      .slice(!isFullMode ? 0 : -3)
                      .sort(
                        (transactionA, transactionB) =>
                          new Date(transactionB.time).getTime() -
                          new Date(transactionA.time).getTime()
                      )
                      .map((transaction) => {
                        return (
                          <Transaction
                            key={transaction.id}
                            transaction={transaction}
                            onEditInfo={setEditingTransaction}
                            onEdit={setIsEditVisible}
                          />
                        );
                      })}
                  </tbody>
                </table>
              )}
              {isEditVisible && editingTransaction && (
                <div className="editForm">
                  <TransactionForm
                    updateData={{ ...editingTransaction }}
                    onHide={setIsEditVisible}
                  />
                </div>
              )}
            </div>
          </div>
      )}
    </>
  );
}
