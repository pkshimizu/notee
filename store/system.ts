import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FirebaseError } from '@firebase/util'
import { StoreState } from './index'

export type SystemState = {
  error?: { code: string; message: string }
}

export const systemInitialState: SystemState = {
  error: undefined,
}

// selector
const systemSelector = (state: StoreState) => state.system
export const errorSelector = createSelector([systemSelector], (state) => state.error)

type FirebaseErrorParams = {
  error: FirebaseError
}

const systemSlice = createSlice({
  name: 'system',
  initialState: systemInitialState,
  reducers: {
    firebaseError: (state: SystemState, action: PayloadAction<FirebaseErrorParams>) => ({
      ...state,
      error: {
        code: action.payload.error.code,
        message: action.payload.error.message,
      },
    }),
    clearError: (state: SystemState) => ({
      ...state,
      error: undefined,
    }),
  },
})

export default systemSlice
