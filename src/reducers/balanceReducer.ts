import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  income: 0,
  expenses: 0,
}
export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
      state.income += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload;
      state.expenses += action.payload;
    },
  },
});

export const { increment, decrement } = balanceSlice.actions;

export default balanceSlice.reducer;
