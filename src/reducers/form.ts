import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FormStatus } from '../types/FormStatus'
import { FormMode } from '../types/Reducer'

const initialState: FormMode = {
  add: false,
  edit: false,
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    control: (state: FormMode, action: PayloadAction<string>) => {
      switch (action.payload) {
        case FormStatus.AddIsOn:
          state.add = true
          state.edit = false
          break

        case FormStatus.EditIsOn:
          state.edit = true
          state.add = false
          break

        case FormStatus.AddIsOff:
          state.add = false
          break

        case FormStatus.EditIsOff:
          state.edit = false
          break

        default:
          state = initialState
      }
    },
  },
})

export const { control } = formSlice.actions

export default formSlice.reducer
