import React, { Dispatch, SetStateAction, useState } from 'react';
import { EditingTransaction } from '../../routes/History';

type Props = {
  transaction: {
    name: string,
    type: string,
    amount: number,
    currentBalance: number,
    time: string,
    id: string,
  },
  onEditInfo: Dispatch<SetStateAction<EditingTransaction | undefined>>,
  onEdit: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Transaction: React.FC<Props> = ({ transaction, onEditInfo, onEdit }) => {
  const { name, type, amount, currentBalance, time, id } = transaction;

  const showEdit = (id: string, name: string, amount: number, type: string) => {
    // onEdit(!isEditVisible);
    onEditInfo({
      id,
      name,
      amount,
      type,
    })

    onEdit(true)
  }

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
        <button className='tools' onClick={() => showEdit(id, name, amount, type)}>
          {/* <NavLink
            to="/add"
            className="link"
            state={{
              id,
              name,
              amount,
              type,
            }}
          > */}
            <img src="./edit.svg" alt="edit" className='tools__logo' />
          {/* </NavLink> */}
        </button>

        <button
          className='tools'
          // onClick={() => handleTransactionDelete(id, amount, type)}
        >
          <img src="./delete.svg" alt="delete" className='tools__logo' />
        </button>
      </td>
    </tr>
  )
}
