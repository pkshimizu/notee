import { createAsyncAction } from '../actions'

export const loginWithGoogle = createAsyncAction<void, void>('loginWithGoogle', async (params, repositories) => {
  repositories.authRepository.loginWithGoogle()
})

export const loginWithGitHub = createAsyncAction<void, void>('loginWithGitHub', async (params, repositories) => {
  repositories.authRepository.loginWithGitHub()
})

export const logout = createAsyncAction<void, void>('logout', async (params, repositories) => {
  repositories.authRepository.logout()
})
