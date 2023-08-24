import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormMode } from '../types/Reducer';

const initialState: FormMode = {
  add: false,
  edit: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    control: (state: FormMode, action: PayloadAction<string>) => {
      switch (action.payload) {
        case 'addIsOn':
          state.add = true;
          state.edit = false;
          break;

        case 'editIsOn':
          state.add = false;
          state.edit = true;
          break;

        case 'addIsOff':
          state.add = false;
          break;

        case 'editIsOff':
          state.edit = false;
          break;

        default:
          state = initialState;
      }
    },
  },
});

export const { control } = formSlice.actions;

export default formSlice.reducer;
