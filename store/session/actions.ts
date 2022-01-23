import { createAsyncAction } from '../actions'
import { EditorTheme, KeyBinding } from '../../components/atoms/inputs/TextEditor'
import sessionSlice from './index'

export const loginWithGoogle = createAsyncAction<void, void>('loginWithGoogle', async (params, repositories) => {
  repositories.authRepository.loginWithGoogle()
})

export const loginWithGitHub = createAsyncAction<void, void>('loginWithGitHub', async (params, repositories) => {
  repositories.authRepository.loginWithGitHub()
})

export const logout = createAsyncAction<void, void>('logout', async (params, repositories) => {
  repositories.authRepository.logout()
})

type FetchUserSettingsParams = {
  mobile: boolean
}

export const fetchUserSettings = createAsyncAction<FetchUserSettingsParams, void>(
  'fetchUserSettings',
  async (params, repositories, state, dispatch) => {
    const currentUser = state.session.currentUser
    if (currentUser) {
      repositories.userRepository.onSnapshotUser(currentUser, (settings) => {
        if (params.mobile) {
          dispatch(
            sessionSlice.actions.modifySettings({
              settings: {
                ...settings,
                editor: {
                  ...settings.editor,
                  keyBinding: 'vscode',
                },
              },
            })
          )
        } else {
          dispatch(sessionSlice.actions.modifySettings({ settings }))
        }
      })
    }
  }
)

type UpdateKeyBindingParams = {
  keyBinding: KeyBinding
}

type UpdateKeyBindingResult = {
  keyBinding: KeyBinding
}

export const updateKeyBinding = createAsyncAction<UpdateKeyBindingParams, UpdateKeyBindingResult>(
  'updateKeyBinding',
  async (params, repositories, state) => {
    const currentUser = state.session.currentUser
    if (currentUser) {
      await repositories.userRepository.updateSettings(currentUser, {
        ...state.session.settings,
        editor: {
          ...state.session.settings.editor,
          keyBinding: params.keyBinding,
        },
      })
    }
    return { keyBinding: params.keyBinding }
  }
)

type UpdateThemeParams = {
  theme: EditorTheme
}

type UpdateThemeResult = {
  theme: EditorTheme
}

export const updateTheme = createAsyncAction<UpdateThemeParams, UpdateThemeResult>(
  'updateTheme',
  async (params, repositories, state) => {
    const currentUser = state.session.currentUser
    if (currentUser) {
      await repositories.userRepository.updateSettings(currentUser, {
        ...state.session.settings,
        editor: {
          ...state.session.settings.editor,
          theme: params.theme,
        },
      })
    }
    return { theme: params.theme }
  }
)
