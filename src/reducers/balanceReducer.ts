import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionPayload {
  amount: number;
  name: string;
  type: string;
}

interface History {
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
        name,
        type,
        currentBalance: state.balance,
        amount,
        time: new Date().toISOString(),
      })
    },
  },
});

export const { increment, decrement } = balanceSlice.actions;

export default balanceSlice.reducer;
