import { AsyncThunk, createAsyncThunk, Dispatch } from '@reduxjs/toolkit'
import { Repositories, StoreState, ThunkExtra } from './index'
import systemSlice from './system'
import { FirebaseError } from '@firebase/util'

export function createAsyncAction<P, R>(
  actionName: string,
  action: (params: P, repositories: Repositories, state: StoreState, dispatch: Dispatch) => Promise<R>
): AsyncThunk<R, P, { extra: ThunkExtra; state: StoreState }> {
  return createAsyncThunk<R, P, { extra: ThunkExtra; state: StoreState }>(
    actionName,
    async (params, { extra, getState, dispatch }) => {
      const state = getState()
      try {
        return await action(params, extra.repositories, state, dispatch)
      } catch (e) {
        if (e instanceof FirebaseError) {
          dispatch(systemSlice.actions.firebaseError({ error: e }))
        }
        throw e
      }
    }
  )
}
