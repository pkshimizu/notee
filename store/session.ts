import { AnyAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncAction } from './actions'
import { StoreState } from './index'
import { Dispatch } from 'react'
import UserRepository from '../repositories/UserRepository'

export type User = {
  uid: string
  name: string | undefined
  email: string | undefined
  imageUrl: string | undefined
}

export type SessionState = {
  initialized: boolean
  currentUser?: User
}

export const sessionInitialState: SessionState = {
  initialized: false,
  currentUser: undefined,
}

// actions
const initializeUser = async (
  user: User | undefined,
  userRepository: UserRepository,
  dispatch: Dispatch<AnyAction>
) => {
  if (user) {
    const result = await userRepository.loadUser(user)
    if (!result) {
      await userRepository.createUser(user)
    }
  }
  dispatch(sessionSlice.actions.changeCurrentUser({ user }))
}
export const initializeSession = createAsyncAction<void, void>(
  'initializeSession',
  async (params, { authRepository, userRepository }, state, dispatch) => {
    if (!state.session.initialized) {
      const user = await authRepository.getUser()
      if (user) {
        await initializeUser(user, userRepository, dispatch)
      }
      authRepository.onChangeAuthState(async (user) => {
        await initializeUser(user, userRepository, dispatch)
      })
    }
  }
)

export const loginWithGoogle = createAsyncAction<void, void>('loginWithGoogle', async (params, repositories) => {
  repositories.authRepository.loginWithGoogle()
})

export const loginWithGitHub = createAsyncAction<void, void>('loginWithGitHub', async (params, repositories) => {
  repositories.authRepository.loginWithGitHub()
})

export const logout = createAsyncAction<void, void>('logout', async (params, repositories) => {
  repositories.authRepository.logout()
})

// selectors
const sessionSelector = (state: StoreState) => state.session
export const currentUserSelector = createSelector([sessionSelector], (state) => state.currentUser)
export const initializedSelector = createSelector([sessionSelector], (state) => state.initialized)

// slice
type ChangeCurrentUserParams = {
  user?: User
}
const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInitialState,
  reducers: {
    changeCurrentUser: (state: SessionState, action: PayloadAction<ChangeCurrentUserParams>) => ({
      ...state,
      currentUser: action.payload.user,
      initialized: true,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(initializeSession.rejected, (state) => ({
      ...state,
      initialized: true,
    }))
  },
})

export default sessionSlice
