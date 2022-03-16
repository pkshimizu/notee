import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Settings, User } from './models'
import UserRepository from '../../repositories/UserRepository'
import { Dispatch } from 'react'
import { createAsyncAction } from '../actions'
import SessionActions from './actions'

export type SessionState = {
  initialized: boolean
  currentUser?: User
  settings: Settings
  maxCapacity: number
  maxStorageCapacity: number
}

export const sessionInitialState: SessionState = {
  initialized: false,
  currentUser: undefined,
  settings: {
    editor: {
      keyBinding: 'vscode',
      theme: 'monokai',
    },
  },
  maxCapacity: 10 * 1024 * 1024,
  maxStorageCapacity: 50 * 1024 * 1024,
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

type ModifySettingsParams = {
  settings: Settings
}
const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInitialState,
  reducers: {
    changeCurrentUser: (state: SessionState, action: PayloadAction<ChangeCurrentUserParams>) => {
      state.currentUser = action.payload.user
      state.initialized = true
    },
    modifySettings: (state: SessionState, action: PayloadAction<ModifySettingsParams>) => {
      state.settings = action.payload.settings
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeSession.rejected, (state) => {
      state.initialized = true
    })
    builder.addCase(SessionActions.updateKeyBinding.fulfilled, (state, action) => {
      state.settings.editor.keyBinding = action.payload.keyBinding
    })
    builder.addCase(SessionActions.updateTheme.fulfilled, (state, action) => {
      state.settings.editor.theme = action.payload.theme
    })
  },
})

export default sessionSlice
