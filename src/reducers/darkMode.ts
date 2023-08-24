import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Mode {
  darkMode: boolean;
}

const savedMode: boolean = JSON.parse(localStorage.getItem('mode') || 'false');

const initialState: Mode = {
  darkMode: savedMode,
};


export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    switchMode: (state: Mode, action: PayloadAction<boolean>) => {
      state.darkMode = !action.payload;
      localStorage.setItem('mode', JSON.stringify(!action.payload));
    },
  },
});

export const { switchMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
