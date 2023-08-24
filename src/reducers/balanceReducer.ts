import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqid from 'uniqid';
import Decimal from 'decimal.js';
import { toast } from 'react-toastify';

import { DeletePayload, State, TransactionPayload } from '../types/Reducer';
import {
  roundAmount,
  updateBalance,
  updateHistory,
  updateBalanceAfterDeletion,
} from './reducerHelper';

const loadBankFromLocalStorage = () => {
  try {
    const transactionsFromStorage = localStorage.getItem('bank');
    if (transactionsFromStorage === null) {
      return undefined;
    }
    return JSON.parse(transactionsFromStorage);
  } catch (error) {
    return undefined;
  }
};

const initialData = {
  balance: 0,
  income: 0,
  expenses: 0,
  history: [],
};

const initialState: State = loadBankFromLocalStorage() || initialData;

export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    saveTransaction: (state) => {
      try {
        const transactionsForStorage = JSON.stringify(state);
        localStorage.setItem('bank', transactionsForStorage);
      } catch {
        toast.error('Failed to Save Transaction');
      }
    },

    increment: (state, action: PayloadAction<TransactionPayload>) => {
      const { amount, name, type } = action.payload;

      const roundedAmount = roundAmount(amount);
      const updatedBalance = updateBalance(roundedAmount, state, true);
      const updatedHistory = updateHistory(roundedAmount, name, type, state, true);

      state.balance += roundedAmount;
      state.income = updatedBalance;
      state.history.push(updatedHistory);
    },
    decrement: (state, action: PayloadAction<TransactionPayload>) => {
      const { amount, name, type } = action.payload;

      const roundedAmount = roundAmount(amount);
      const updatedBalance = updateBalance(roundedAmount, state, false);
      const updatedHistory = updateHistory(roundedAmount, name, type, state, false);

      state.balance -= roundedAmount;
      state.expenses = updatedBalance;
      state.history.push(updatedHistory);
    },
    updateIncome: (state, action: PayloadAction<TransactionPayload>) => {
      const { amount, name, type, id } = action.payload;

      const targetTransaction = state.history.find(
        (transaction) => transaction.id === id
      );

      if (targetTransaction && targetTransaction?.type === type) {
        state.balance = new Decimal(state.balance)
          .minus(targetTransaction.amount)
          .plus(amount)
          .toNumber();
        state.income = new Decimal(state.income)
          .minus(targetTransaction.amount)
          .plus(amount)
          .toNumber();
      } else if (targetTransaction) {
        state.balance = new Decimal(state.balance)
          .plus(targetTransaction.amount)
          .plus(amount)
          .toNumber();
        state.expenses = new Decimal(state.expenses)
          .minus(targetTransaction.amount)
          .toNumber();
        state.income = new Decimal(state.income).plus(amount).toNumber();
      }
      state.history = state.history.map((transaction) => {
        if (transaction.id === id) {
          return {
            ...transaction,
            name,
            amount,
            type,
            currentBalance: state.balance,
          };
        }
        return transaction;
      });
    },
    updateExpenses: (state, action: PayloadAction<TransactionPayload>) => {
      const { amount, name, type, id } = action.payload;

      const targetTransaction = state.history.find(
        (transaction) => transaction.id === id
      );

      if (targetTransaction && targetTransaction?.type === type) {
        state.balance = new Decimal(state.balance)
          .plus(targetTransaction.amount)
          .minus(amount)
          .toNumber();
        state.expenses = new Decimal(state.expenses)
          .minus(targetTransaction.amount)
          .plus(amount)
          .toNumber();
      } else if (targetTransaction) {
        state.balance = new Decimal(state.balance)
          .minus(targetTransaction.amount)
          .minus(amount)
          .toNumber();
        state.expenses = new Decimal(state.expenses).plus(amount).toNumber();
        state.income = new Decimal(state.income)
          .minus(targetTransaction.amount)
          .toNumber();
      }
      state.history = state.history.map((transaction) => {
        if (transaction.id === id) {
          return {
            ...transaction,
            name,
            amount,
            type,
            currentBalance: state.balance,
          };
        }
        return transaction;
      });
    },
    deleteIncome: (state, action: PayloadAction<DeletePayload>) => {
      updateBalanceAfterDeletion(state, action.payload.id, action.payload.amount, true);
    },
    deleteExpenses: (state, action: PayloadAction<DeletePayload>) => {
      updateBalanceAfterDeletion(state, action.payload.id, action.payload.amount, false);
    },
    removeAll: (state) => {
      state.balance = 0;
      state.income = 0;
      state.expenses = 0;
      state.history = [];

      localStorage.setItem('bank', JSON.stringify(initialData));
    },
  },
});

export const {
  saveTransaction,
  increment,
  decrement,
  updateIncome,
  updateExpenses,
  deleteIncome,
  deleteExpenses,
  removeAll,
} = balanceSlice.actions;

export default balanceSlice.reducer;
