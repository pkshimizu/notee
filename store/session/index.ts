import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './models'
import UserRepository from '../../repositories/UserRepository'
import { Dispatch } from 'react'
import { createAsyncAction } from '../actions'

export type SessionState = {
  initialized: boolean
  currentUser?: User
}

export const sessionInitialState: SessionState = {
  initialized: false,
  currentUser: undefined,
}

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
