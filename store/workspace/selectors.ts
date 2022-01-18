import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'

const workspaceSelector = (state: StoreState) => state.workspace
export const openItemIdsSelector = createSelector([workspaceSelector], (state) => state.itemIds)
export const activeItemIdSelector = createSelector([workspaceSelector], (state) => state.activeItemId)
export const openSideBarSelector = createSelector([workspaceSelector], (state) => state.openSideBar)
