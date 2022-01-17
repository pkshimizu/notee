import AuthRepository from '../repositories/AuthRepository'
import { combineReducers, Store } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import sessionSlice, { sessionInitialState } from './session'
import notesSlice, { notesInitialState } from './notes'
import NoteRepository from '../repositories/NoteRepository'
import workspaceSlice, { workspaceInitialState } from './workspace'
import UserRepository from '../repositories/UserRepository'
import systemSlice, { systemInitialState } from './system'
import dialogsSlice, { dialogsInitialState } from './dialogs'
import storage from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

const rootReducer = combineReducers({
  system: systemSlice.reducer,
  dialogs: dialogsSlice.reducer,
  session: sessionSlice.reducer,
  workspace: workspaceSlice.reducer,
  notes: notesSlice.reducer,
})

const preloadedState = () => ({
  system: systemInitialState,
  dialogs: dialogsInitialState,
  session: sessionInitialState,
  workspace: workspaceInitialState,
  notes: notesInitialState,
})

export type StoreState = ReturnType<typeof preloadedState>

export type ReduxStore = Store<StoreState>

export type Repositories = {
  authRepository: AuthRepository
  userRepository: UserRepository
  noteRepository: NoteRepository
}

export type ThunkExtra = {
  repositories: Repositories
}

const thunkExtra: ThunkExtra = {
  repositories: {
    authRepository: new AuthRepository(),
    userRepository: new UserRepository(),
    noteRepository: new NoteRepository(),
  },
}

const persistConfig = {
  key: 'workspace',
  storage,
  whitelist: ['workspace'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: thunkExtra },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      createLogger({
        diff: true,
        collapsed: true,
      })
    ),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: preloadedState(),
})

export const persistor = persistStore(store)
export default store
