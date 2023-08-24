import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NewTransaction {
  newTransactionId: string,
}

const initialState = {
  newTransactionId: '',
};

export const NewTransactionSlice = createSlice({
  name: 'newTransaction',
  initialState,
  reducers: {
    setNewTranscationId: (state: NewTransaction, action: PayloadAction<string>) => {
      state.newTransactionId = action.payload;
    },
  },
});

export const { setNewTranscationId } = NewTransactionSlice.actions;

export default NewTransactionSlice.reducer;
