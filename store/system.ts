import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoreState } from './index'

export type SystemState = {
  message?: string
  error?: { code: string; message: string }
}

export const systemInitialState: SystemState = {
  message: undefined,
  error: undefined,
}

// selector
const systemSelector = (state: StoreState) => state.system
export const errorSelector = createSelector([systemSelector], (state) => state.error)
export const systemMessageSelector = createSelector([systemSelector], (state) => state.message)

type MessageParams = {
  message: string
}

type FirebaseErrorParams = {
  code: string
  message: string
}

const systemSlice = createSlice({
  name: 'system',
  initialState: systemInitialState,
  reducers: {
    message: (state: SystemState, action: PayloadAction<MessageParams>) => ({
      ...state,
      message: action.payload.message,
    }),
    clearMessage: (state: SystemState) => ({
      ...state,
      message: undefined,
    }),
    firebaseError: (state: SystemState, action: PayloadAction<FirebaseErrorParams>) => ({
      ...state,
      error: {
        code: action.payload.code,
        message: action.payload.message,
      },
    }),
    clearError: (state: SystemState) => ({
      ...state,
      error: undefined,
    }),
  },
})

export default systemSlice
