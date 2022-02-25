import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'

const systemSelector = (state: StoreState) => state.system

const SystemSelectors = {
  title: createSelector([systemSelector], (state) => state.title),
  error: createSelector([systemSelector], (state) => state.error),
  systemMessage: createSelector([systemSelector], (state) => state.message),
  loading: createSelector([systemSelector], (state) => state.loading),
}

export default SystemSelectors
