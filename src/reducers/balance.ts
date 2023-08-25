import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DeletePayload, State, TransactionPayload } from '../types/Reducer'
import {
  decrementBalance,
  decrementBalanceIncome,
  incrementBalance,
  incrementBalanceIncome,
  loadBankFromLocalStorage,
  removeAllData,
  saveTransactionInStorage,
  updateBalanceAfterDeletion,
} from '../utils/reducerHelper'

const initialData = {
  balance: 0,
  income: 0,
  expenses: 0,
  history: [],
}

const initialState: State = loadBankFromLocalStorage() || initialData

export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    saveTransaction: (state) => saveTransactionInStorage(state),

    increment: (state, action: PayloadAction<TransactionPayload>) =>
      incrementBalance(state, action),
    decrement: (state, action: PayloadAction<TransactionPayload>) =>
      decrementBalance(state, action),
    updateIncome: (state, action: PayloadAction<TransactionPayload>) =>
      incrementBalanceIncome(state, action),
    updateExpenses: (state, action: PayloadAction<TransactionPayload>) =>
      decrementBalanceIncome(state, action),
    deleteIncome: (state, action: PayloadAction<DeletePayload>) =>
      updateBalanceAfterDeletion(state, action.payload.id, action.payload.amount, true),
    deleteExpenses: (state, action: PayloadAction<DeletePayload>) =>
      updateBalanceAfterDeletion(state, action.payload.id, action.payload.amount, false),
    removeAll: (state) => removeAllData(state, initialData),
  },
})

export const {
  saveTransaction,
  increment,
  decrement,
  updateIncome,
  updateExpenses,
  deleteIncome,
  deleteExpenses,
  removeAll,
} = balanceSlice.actions

export default balanceSlice.reducer
