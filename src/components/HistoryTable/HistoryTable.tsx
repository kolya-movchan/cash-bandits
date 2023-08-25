import React, { Dispatch, SetStateAction } from 'react'
import { History } from '../../types/Reducer'
import { EditingTransaction } from '../../types/Transaction'
import { Transaction } from '../Transaction'

type Props = {
  history: History[]
  isFullMode: boolean
  onEditInfo: Dispatch<SetStateAction<EditingTransaction | undefined>>
}

export const HistoryTable: React.FC<Props> = ({ history, isFullMode, onEditInfo }) => {
  return (
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
                onEditInfo={onEditInfo}
              />
            )
          })}
      </tbody>
    </table>
  )
}
