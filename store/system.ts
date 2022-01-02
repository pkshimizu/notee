import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FirebaseError } from '@firebase/util'

export type SystemState = {
  error?: { code: string; message: string }
}

export const systemInitialState: SystemState = {
  error: undefined,
}

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
  },
})

export default systemSlice
