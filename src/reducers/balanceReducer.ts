import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqid from 'uniqid';
import Decimal from 'decimal.js';
import { toast } from 'react-toastify';

import { DeletePayload, State, TransactionPayload } from '../types/Reducer';

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

const initialState: State = loadBankFromLocalStorage() || {
  balance: 0,
  income: 0,
  expenses: 0,
  history: [],
};

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
    
      const decimalAmount = new Decimal(amount);
      const roundedAmount = +decimalAmount.toFixed(2);
      const roundedBalance = new Decimal(state.balance).plus(roundedAmount).toNumber();
      const roundedIncome = new Decimal(state.income).plus(roundedAmount).toNumber();
    
      state.balance = roundedBalance;
      state.income = roundedIncome;
    
      state.history.push({
        id: uniqid(),
        name,
        type,
        currentBalance: roundedBalance,
        amount: roundedAmount,
        time: new Date().toISOString(),
      });
    },
    decrement: (state, action: PayloadAction<TransactionPayload>) => {
      const { amount, name, type } = action.payload;
    
      const decimalAmount = new Decimal(amount);
      const roundedAmount = +decimalAmount.toFixed(2);
      const roundedBalance = new Decimal(state.balance).minus(roundedAmount).toNumber();
      const roundedExpenses = new Decimal(state.expenses).plus(roundedAmount).toNumber();
    
      state.balance = roundedBalance;
      state.expenses = roundedExpenses;
    
      state.history.push({
        id: uniqid(),
        name,
        type,
        currentBalance: roundedBalance,
        amount: roundedAmount,
        time: new Date().toISOString(),
      });
    },
    updateIncome: (state, action: PayloadAction<TransactionPayload>) => {
      const { amount, name, type, id } = action.payload;
    
      const targetTransaction = state.history.find(transaction => transaction.id === id);
    
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
        state.income = new Decimal(state.income)
        .plus(amount)
        .toNumber();
      }
      state.history = state.history.map(transaction => {
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
    
      const targetTransaction = state.history.find(transaction => transaction.id === id);
    
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
        state.expenses = new Decimal(state.expenses)
          .plus(amount)
          .toNumber();
        state.income = new Decimal(state.income)
        .minus(targetTransaction.amount)
        .toNumber();
      }
      state.history = state.history.map(transaction => {
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
      const { id, amount } = action.payload;
    
      state.history = state.history.filter(transaction => transaction.id !== id);
    
      const decimalAmount = new Decimal(amount);
      state.balance = new Decimal(state.balance).minus(decimalAmount).toNumber();
      state.income = new Decimal(state.income).minus(decimalAmount).toNumber();
    
    },
    deleteExpenses: (state, action: PayloadAction<DeletePayload>) => {
      const { id, amount } = action.payload;
    
      state.history = state.history.filter(transaction => transaction.id !== id);
    
      const decimalAmount = new Decimal(amount);
      state.balance = new Decimal(state.balance).plus(decimalAmount).toNumber();
      state.expenses = new Decimal(state.expenses).minus(decimalAmount).toNumber();
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
  deleteExpenses
} = balanceSlice.actions;

export default balanceSlice.reducer;
