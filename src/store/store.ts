import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import balanceSlice from '../reducers/balance';
import darkModeSlice from '../reducers/darkMode';
import formSlice from '../reducers/form';
import NewTransactionSlice from '../reducers/newTransaction';

export const store = configureStore({
  reducer: {
    balance: balanceSlice,
    darkMode: darkModeSlice,
    form: formSlice,
    NewTransaction: NewTransactionSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
