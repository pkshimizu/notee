import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'

const sessionSelector = (state: StoreState) => state.session

const SessionSelectors = {
  currentUser: createSelector([sessionSelector], (state) => state.currentUser),
  initialized: createSelector([sessionSelector], (state) => state.initialized),
  editorSettings: createSelector([sessionSelector], (state) => state.settings.editor),
  maxCapacity: createSelector([sessionSelector], (state) => 10 * 1024 * 1024),
}

export default SessionSelectors
