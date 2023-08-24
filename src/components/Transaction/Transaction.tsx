import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { useAppDispatch } from '../../app/hooks';
import { EditingTransaction } from '../../routes/History';
import {
  deleteIncome,
  deleteExpenses,
  saveTransaction,
} from '../../reducers/balanceReducer';
import classNames from 'classnames';

type Props = {
  transaction: {
    name: string;
    type: string;
    amount: number;
    currentBalance: number;
    time: string;
    id: string;
  };
  onEditInfo: Dispatch<SetStateAction<EditingTransaction | undefined>>;
  onEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Transaction: React.FC<Props> = ({ transaction, onEditInfo, onEdit }) => {
  const dispatch = useAppDispatch();

  const { name, type, amount, currentBalance, time, id } = transaction;

  const currentDate = new Date(time);

  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);
  const formattedTime = currentDate.toLocaleTimeString('en-US', timeOptions);

  // console.log('Date:', formattedDate);
  // console.log('Time:', formattedTime);

  const showEdit = (id: string, name: string, amount: number, type: string) => {
    onEditInfo({
      id,
      name,
      amount,
      type,
    });

    onEdit(true);
  };

  const handleTransactionDelete = (id: string, amount: number, type: string) => {
    if (type === 'income') {
      dispatch(deleteIncome({ id, amount }));
    } else {
      dispatch(deleteExpenses({ id, amount }));
    }

    dispatch(saveTransaction());
  };

  return (
    <>
      <tr
        // className={type === 'income' ? 'table-success' : 'table-danger'}
        key={id}
      >
        <td className="transaction-cell-name">{name}</td>
        <td
          className={classNames(
            'transaction-cell',
            { 'income-cell': type === 'income' },
            { 'expense-cell': type === 'expenses' }
          )}
        >
          {type}
        </td>
        <td>
          {type === 'expenses' && amount !== 0 && '-'} ${amount.toLocaleString()}
        </td>
        <td>${currentBalance.toLocaleString()}</td>
        <td className="time-cell">
          {formattedDate} <span className="hours-cell">at {formattedTime}</span>
        </td>
        <td>
          <div className="tools-container">
            <button
              className="edit-button"
              onClick={() => showEdit(id, name, amount, type)}
            >
              <img src="./edit.svg" alt="edit logo" className="tools" />
            </button>
            <button
              className="delete-button"
              onClick={() => {
                confirmAlert({
                  title: 'Confirm to submit',
                  message: 'Are you sure to do this?',
                  buttons: [
                    {
                      label: 'Yes',
                      onClick: () => {
                        handleTransactionDelete(id, amount, type);
                        toast.success('Transaction deleted successfully!', {
                          autoClose: 1500,
                        });
                      },
                    },
                    {
                      label: 'No',
                    },
                  ],
                })
              }}
            >
              <img src="./delete.svg" alt="delete logo" className="tools" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
