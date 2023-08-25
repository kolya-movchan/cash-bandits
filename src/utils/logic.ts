import { Dispatch, SetStateAction } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { UseFormReset, UseFormSetFocus } from 'react-hook-form'
import { toast } from 'react-toastify'
import {
  balanceSlice,
  decrement,
  deleteExpenses,
  deleteIncome,
  increment,
  saveTransaction,
  updateExpenses,
  updateIncome,
} from '../reducers/balance'
import { control } from '../reducers/form'
import { setNewTranscationId } from '../reducers/newTransaction'
import { FormStatus } from '../types/FormStatus'
import { EditingTransaction, Transaction, UpdateData } from '../types/Transaction'
import { AppDispatch } from './../store/store'

export const updateEditInfo = (
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

  dispatch(control(FormStatus.EditIsOn))
}

export const showModalSingleDelete = (dispatch: AppDispatch, darkMode: boolean) => {
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

export const showModalDeleteAll = (
  darkMode: boolean,
  id: string,
  amount: number,
  type: string,
  dispatch: AppDispatch
) => {
  const deleteTransaction = (
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

export const hideEditForm = (updateData: UpdateData, dispatch: AppDispatch) => {
  if (updateData) {
    dispatch(control(FormStatus.EditIsOff))
  } else {
    dispatch(control(FormStatus.AddIsOff))
  }
}

export const checkIfSameInfo = (dataValue: Transaction, UpdateDataValue: UpdateData) => {
  const duplicateName = dataValue.name === UpdateDataValue.name
  const duplicateAmount = +dataValue.amount === UpdateDataValue.amount
  const duplicateType = dataValue.type === UpdateDataValue.type

  const allDuplicates = duplicateName && duplicateAmount && duplicateType

  if (allDuplicates) {
    return true
  }

  return false
}

export const processSubmit = (
  dispatch: AppDispatch,
  updateData: UpdateData | undefined,
  data: Transaction,
  newTransactionId: string
) => {
  if (updateData) {
    hideEditForm(updateData, dispatch)
    const sameData = checkIfSameInfo(data, updateData)

    if (sameData) {
      return
    }
  }

  const newData = { ...data, amount: parseFloat(data.amount), id: newTransactionId }

  if (updateData && data.type === 'income') {
    dispatch(updateIncome({ ...newData, id: updateData.id }))
  } else if (updateData) {
    dispatch(updateExpenses({ ...newData, id: updateData.id }))
  }

  if (!updateData && data.type === 'income') {
    dispatch(increment(newData))
  } else if (!updateData) {
    dispatch(decrement(newData))
  }
}

export const processSuccess = (
  reset: UseFormReset<Transaction>,
  dispatch: AppDispatch,
  updateData: UpdateData | undefined,
  newTransactionId: string
) => {
  dispatch(saveTransaction())
  reset()
  const message = `Transaction ${updateData ? 'updated' : 'added'} successfully!`

  toast.success(message, {
    autoClose: 1500,
  })

  dispatch(control(FormStatus.AddIsOff))
  dispatch(setNewTranscationId(updateData ? updateData?.id : newTransactionId))
}

export const focusInput = (setFocus: UseFormSetFocus<Transaction>) => {
  setTimeout(() => {
    setFocus('name')
  }, 150)
}
