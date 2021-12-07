import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit'
import { Repositories, StoreState, ThunkExtra } from './index'

export function createAsyncAction<P, R>(
  actionName: string,
  action: (params: P, repositories: Repositories, state: StoreState) => Promise<R>
): AsyncThunk<R, P, { extra: ThunkExtra; state: StoreState }> {
  return createAsyncThunk<R, P, { extra: ThunkExtra; state: StoreState }>(
    actionName,
    async (params, { extra, getState }) => {
      const state = getState()
      return action(params, extra.repositories, state)
    }
  )
}
