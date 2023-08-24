import { useEffect, useLayoutEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TransactionForm } from '../TransactionForm';
import { Transaction } from '../../components/Transaction';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { confirmAlert } from 'react-confirm-alert';
import { balanceSlice } from '../../reducers/balance';

export type EditingTransaction = {
  id: string;
  name: string;
  amount: number;
  type: string;
};

export const History = () => {
  const { history } = useAppSelector((state) => state.balance);
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const { add, edit } = useAppSelector((state) => state.form);

  const dispatch = useAppDispatch();

  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<EditingTransaction>();
  const [isFullMode, setIsFullMode] = useState(false);
  const locationData = useLocation();

  useLayoutEffect(() => {
    if (locationData.pathname.includes('/transaction')) {
      setIsFullMode(false);
    } else {
      setIsFullMode(true);
    }

    document.documentElement.scrollTop = 0;
  }, []);

  const deleteAllHistory = () => {
    dispatch(balanceSlice.actions.removeAll());
  };

  // console.log();

  return (
    <>
      {!history.length ? (
        !isFullMode ? (
          <div className="no-data">
            <span
              className={classNames('no-data__text', {
                'no-data__text--dark-mode': darkMode,
              })}
            >
              No Data Avaliable
            </span>
          </div>
        ) : (
          <></>
        )
      ) : (
        <div
          className={classNames('history-container', {
            'history-container--full': !isFullMode,
            'history-container--animated': isFullMode && history.length === 1,
          })}
        >
          <div className="history-wrapper">
            <div className="history-top">
              <h2
                className={classNames('section-heading', {
                  'section-heading--dark-mode': darkMode,
                })}
              >{`${
                locationData.pathname.includes('/transaction') ? 'All' : 'Recent'
              } Transactions`}</h2>
              {isFullMode && (
                <div className="action-controls">
                  <button
                    className="remove-all"
                    onClick={() => {
                      confirmAlert({
                        title: 'Confirm to submit',
                        message: 'Are you sure you want to delete all your transactions?',
                        overlayClassName: darkMode ? 'confirm-window--dark-mode' : 'confirm-window',
                        buttons: [
                          {
                            label: 'Yes',
                            onClick: () => {
                              deleteAllHistory();

                              toast.success('All transactions deleted successfully!', {
                                autoClose: 1500,
                              });
                            },
                          },
                          {
                            label: 'No',
                          },
                        ],
                      });
                    }}
                  >
                    Remove all
                    {/* <span className="remove-all__cross">x</span> */}
                  </button>
                  <NavLink className="view-all" to="/transactions">
                    <span style={{ marginRight: '3px' }}>View all </span>
                    <span className="view-all__eagle">&gt;</span>
                  </NavLink>
                </div>
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
                          last={history[history.length - 1].id}
                        />
                      );
                    })}
                </tbody>
              </table>
            )}
            {!add && edit && isEditVisible && editingTransaction && (
              <div className={classNames('editForm', { 'editForm--dark-mode': darkMode })}>
                <TransactionForm
                  updateData={{ ...editingTransaction }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
