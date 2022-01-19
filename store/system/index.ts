import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SystemState = {
  title?: string
  message?: string
  error?: { code: string; message: string }
}

export const systemInitialState: SystemState = {
  title: undefined,
  message: undefined,
  error: undefined,
}

type TitleParams = {
  title?: string
}

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
    title: (state: SystemState, action: PayloadAction<TitleParams>) => ({
      ...state,
      title: action.payload.title,
    }),
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
