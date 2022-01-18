import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'

const sessionSelector = (state: StoreState) => state.session
export const currentUserSelector = createSelector([sessionSelector], (state) => state.currentUser)
export const initializedSelector = createSelector([sessionSelector], (state) => state.initialized)
