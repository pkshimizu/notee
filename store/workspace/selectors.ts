import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'

const workspaceSelector = (state: StoreState) => state.workspace
export const openItemsSelector = createSelector([workspaceSelector], (state) => state.items)
export const activeItemIdSelector = createSelector([workspaceSelector], (state) => state.activeItemId)
export const openSideBarSelector = createSelector([workspaceSelector], (state) => state.openSideBar)
export const expandedNoteTreeIdsSelector = createSelector([workspaceSelector], (state) => state.expandedNoteTreeIds)
