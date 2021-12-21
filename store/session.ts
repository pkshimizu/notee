import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncAction } from './actions'
import { StoreState } from './index'

export type User = {
  uid: string
  name: string | undefined
  email: string | undefined
  imageUrl: string | undefined
}

export type SessionState = {
  initialize: boolean
  currentUser?: User
}

export const sessionInitialState: SessionState = {
  initialize: false,
  currentUser: undefined,
}

// actions

type InitializeSessionParams = {
  handleChangeAuthState: (user?: User) => void
}

export const initializeSession = createAsyncAction<InitializeSessionParams, void>(
  'initializeSession',
  async (params, repositories, state) => {
    if (!state.session.initialize) {
      repositories.authRepository.onChangeAuthState(params.handleChangeAuthState)
    }
  }
)

export const loginWithGoogle = createAsyncAction<void, void>('loginWithGoogle', async (params, repositories) => {
  repositories.authRepository.loginWithGoogle()
})

export const logout = createAsyncAction<void, void>('logout', async (params, repositories) => {
  repositories.authRepository.logout()
})

// selectors
const sessionSelector = (state: StoreState) => state.session
export const currentUserSelector = createSelector([sessionSelector], (state) => state.currentUser)

// slice
const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInitialState,
  reducers: {
    changeCurrentUser: (state: SessionState, action: PayloadAction<User | undefined>) => ({
      ...state,
      currentUser: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(initializeSession.fulfilled, (state) => ({
      ...state,
      initialize: true,
    }))
  },
})

export default sessionSlice
