import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'

const systemSelector = (state: StoreState) => state.system
export const titleSelector = createSelector([systemSelector], (state) => state.title)
export const errorSelector = createSelector([systemSelector], (state) => state.error)
export const systemMessageSelector = createSelector([systemSelector], (state) => state.message)
export const loadingSelector = createSelector([systemSelector], (state) => state.loading)
