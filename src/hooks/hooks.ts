import { Dispatch, SetStateAction } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  balanceSlice,
  deleteExpenses,
  deleteIncome,
  saveTransaction,
} from '../reducers/balance'
import { control } from '../reducers/form'

import type { RootState, AppDispatch } from '../store/store'
import { EditingTransaction } from '../types/Transaction'
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSelectorData = () => {
  return useAppSelector((state) => {
    return {
      balance: state.balance.balance,
      income: state.balance.income,
      expenses: state.balance.expenses,
      darkMode: state.darkMode.darkMode,
      add: state.form.add,
      edit: state.form.edit,
      history: state.balance.history,
      newTransactionId: state.NewTransaction.newTransactionId,
    }
  })
}

export const useModalWindow = (dispatch: AppDispatch, darkMode: boolean) => {
  return () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete all your transactions?',
      overlayClassName: darkMode ? 'confirm-window--dark-mode' : 'confirm-window',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            dispatch(balanceSlice.actions.removeAll())

            toast.success('All transactions deleted successfully!', {
              autoClose: 1500,
            })
          },
        },
        {
          label: 'No',
        },
      ],
    })
  }
}

export const useEditFormOpen = (
  id: string,
  name: string,
  amount: number,
  type: string,
  onEditInfo: Dispatch<SetStateAction<EditingTransaction | undefined>>,
  dispatch: AppDispatch
) => {
  onEditInfo({
    id,
    name,
    amount,
    type,
  })

  dispatch(control('editIsOn'))
}

export const deleteTransaction = (
  id: string,
  amount: number,
  type: string,
  dispatch: AppDispatch
) => {
  if (type === 'income') {
    dispatch(deleteIncome({ id, amount }))
  } else {
    dispatch(deleteExpenses({ id, amount }))
  }

  dispatch(saveTransaction())
  toast.success('Transaction deleted successfully!', {
    autoClose: 1500,
  })
}

export const useModalWindowDelete = (
  darkMode: boolean,
  id: string,
  amount: number,
  type: string,
  dispatch: AppDispatch
) => {
  return () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this?',
      overlayClassName: darkMode ? 'confirm-window--dark-mode' : 'confirm-window',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteTransaction(id, amount, type, dispatch)
          },
        },

        {
          label: 'No',
        },
      ],
    })
  }
}
