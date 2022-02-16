import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LabelText } from '../../hooks/useLocale'

export type SystemState = {
  title?: string
  message?: LabelText
  error?: { code: string; message: string }
  loading: boolean
}

export const systemInitialState: SystemState = {
  title: undefined,
  message: undefined,
  error: undefined,
  loading: true,
}

type TitleParams = {
  title?: string
}

type MessageParams = {
  message: LabelText
}

type FirebaseErrorParams = {
  code: string
  message: string
}

type LoadingParams = {
  loading: boolean
}

const systemSlice = createSlice({
  name: 'system',
  initialState: systemInitialState,
  reducers: {
    title: (state: SystemState, action: PayloadAction<TitleParams>) => {
      state.title = action.payload.title
    },
    message: (state: SystemState, action: PayloadAction<MessageParams>) => {
      state.message = action.payload.message
    },
    clearMessage: (state: SystemState) => {
      state.message = undefined
    },
    firebaseError: (state: SystemState, action: PayloadAction<FirebaseErrorParams>) => {
      state.error = {
        code: action.payload.code,
        message: action.payload.message,
      }
    },
    clearError: (state: SystemState) => {
      state.error = undefined
    },
    loading: (state: SystemState, action: PayloadAction<LoadingParams>) => {
      state.loading = action.payload.loading
    },
  },
})

export default systemSlice
