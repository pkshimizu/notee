import AuthRepository from '../repositories/AuthRepository'
import { combineReducers, Store } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import sessionSlice, { sessionInitialState } from './session'

const rootReducer = combineReducers({
  session: sessionSlice.reducer,
})

const preloadedState = () => ({
  session: sessionInitialState,
})

export type StoreState = ReturnType<typeof preloadedState>

export type ReduxStore = Store<StoreState>

export type Repositories = {
  authRepository: AuthRepository
}

export type ThunkExtra = {
  repositories: Repositories
}

const thunkExtra: ThunkExtra = {
  repositories: {
    authRepository: new AuthRepository(),
  },
}

/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */
const createStore = () => {
  const middlewareList = [
    ...getDefaultMiddleware({
      thunk: { extraArgument: thunkExtra },
    }),
  ]

  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({
      diff: true,
      collapsed: true,
    })
    middlewareList.push(logger)
  }

  return configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState(),
  })
}

const store = createStore()

export default store
