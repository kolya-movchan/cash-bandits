import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { EditingTransaction } from '../../routes/History';
import { deleteIncome, deleteExpenses, saveTransaction } from '../../reducers/balance';
import classNames from 'classnames';
import { control } from '../../reducers/form';
import { setNewTranscationId } from '../../reducers/newTransaction';

type Props = {
  transaction: {
    name: string;
    type: string;
    amount: number;
    currentBalance: number;
    time: string;
    id: string;
  };
  last: string;
  onEditInfo: Dispatch<SetStateAction<EditingTransaction | undefined>>;
  onEdit: (value: boolean) => void;
};

export const Transaction: React.FC<Props> = ({
  transaction,
  onEditInfo,
  onEdit,
  last,
}) => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.darkMode);
  const { newTransactionId } = useAppSelector((state) => state.NewTransaction);

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

  const showEdit = (id: string, name: string, amount: number, type: string) => {
    onEditInfo({
      id,
      name,
      amount,
      type,
    });

    onEdit(true);
    dispatch(control('editIsOn'));
  };

  const handleTransactionDelete = (id: string, amount: number, type: string) => {
    if (type === 'income') {
      dispatch(deleteIncome({ id, amount }));
    } else {
      dispatch(deleteExpenses({ id, amount }));
    }

    dispatch(saveTransaction());
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setNewTranscationId(''));
    }, 1000);
  }, [])

  return (
    <tr
      key={id}
      className={classNames({
        'new-row': id === newTransactionId && !location.hash.includes('/transactions') ,
      })}
    >
      <td
        className={classNames('transaction-cell-name', {
          'transaction-cell-name--dark-mode': darkMode,
        })}
      >
        {name}
      </td>
      <td
        className={classNames(
          'transaction-cell',
          { 'income-cell': type === 'income' },
          { 'expense-cell': type === 'expenses' }
        )}
      >
        {type}
      </td>
      <td
        className={classNames('transaction-cell-amount', {
          'transaction-cell-amount--dark-mode': darkMode,
        })}
      >
        {type === 'expenses' && amount !== 0 && '-'} ${amount.toLocaleString()}
      </td>
      <td
        className={classNames('transaction-cell-balance', {
          'transaction-cell-balance--dark-mode': darkMode,
        })}
      >
        ${currentBalance.toLocaleString()}
      </td>
      <td
        className={classNames('time-cell', {
          'time-cell--dark-mode': darkMode,
        })}
      >
        {formattedDate} <span className="hours-cell">at {formattedTime}</span>
      </td>
      <td>
        <div className="tools-container">
          <button
            className={classNames('edit-button', {
              'edit-button--dark-mode': darkMode,
            })}
            onClick={() => showEdit(id, name, amount, type)}
          >
            <img src="./edit.svg" alt="edit logo" className="tools" />
          </button>
          <button
            className={classNames('delete-button', {
              'delete-button--dark-mode': darkMode,
            })}
            onClick={() => {
              confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure to do this?',
                overlayClassName: darkMode
                  ? 'confirm-window--dark-mode'
                  : 'confirm-window',
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
              });
            }}
          >
            <img src="./delete.svg" alt="delete logo" className="tools" />
          </button>
        </div>
      </td>
    </tr>
  );
};
