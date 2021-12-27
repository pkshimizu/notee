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
export const initializeSession = createAsyncAction<void, void>(
  'initializeSession',
  async (params, { authRepository, userRepository }, state, dispatch) => {
    if (!state.session.initialize) {
      authRepository.onChangeAuthState(async (user) => {
        if (user) {
          const result = await userRepository.loadUser(user)
          if (!result) {
            await userRepository.createUser(user)
          }
        }
        dispatch(sessionSlice.actions.changeCurrentUser({ user }))
      })
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
