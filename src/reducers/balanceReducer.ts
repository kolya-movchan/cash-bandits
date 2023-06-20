import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

interface TransactionPayload {
  amount: number;
  name: string;
  type: string;
  id?: string,
}

interface DeletePayload {
  id: string,
  amount: number,
}

export interface History {
  id: string,
  name: string,
  type: string,
  currentBalance: number,
  amount: number,
  time: string,
}

interface State {
  balance: number,
  income: number,
  expenses: number,
  history: History[],
}

const initialState: State = {
  balance: 0,
  income: 0,
  expenses: 0,
  history: [],
}
export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<TransactionPayload>) => {
      const { amount , name, type } = action.payload;

      state.balance += amount;
      state.income += amount;
      state.history.push({
        id: uniqid(),
        name,
        type,
        currentBalance: state.balance,
        amount,
        time: new Date().toISOString(),
      })
    },
    decrement: (state, action: PayloadAction<TransactionPayload>) => {
      const { amount , name, type } = action.payload;

      state.balance -= amount;
      state.expenses += amount;
      state.history.push({
        id: uniqid(),
        name,
        type,
        currentBalance: state.balance,
        amount,
        time: new Date().toISOString(),
      })
    },
    updateIncome: (state, action: PayloadAction<TransactionPayload>) => {
      const { amount, name, type, id } = action.payload;

      const targetTransaction = state.history.find(transaction => transaction.id === id);

      if (targetTransaction) {
        state.balance -= targetTransaction.amount;
        state.income -= targetTransaction.amount;

        state.balance += amount;
        state.income += amount;
  
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
      }
    },
    updateExpenses: (state, action: PayloadAction<TransactionPayload>) => {
      const { amount, name, type, id } = action.payload;

      const targetTransaction = state.history.find(transaction => transaction.id === id);

      if (targetTransaction) {
        state.balance += targetTransaction.amount;
        state.expenses -= targetTransaction.amount;

        state.balance -= amount;
        state.expenses += amount;
  
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
      }
    },
    deleteIncome: (state, action: PayloadAction<DeletePayload>) => {
      const { id, amount } = action.payload;

      state.history = state.history.filter(transaction => transaction.id !== id);

      state.balance -= amount;
      state.income -= amount;
    },
    deleteExpenses: (state, action: PayloadAction<DeletePayload>) => {
      const { id, amount } = action.payload;

      state.history = state.history.filter(transaction => transaction.id !== id);

      state.balance += amount;
      state.expenses -= amount;
    },
  },
});


export const { increment, decrement, updateIncome, updateExpenses, deleteIncome, deleteExpenses } = balanceSlice.actions;

export default balanceSlice.reducer;
