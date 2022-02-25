import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'

const workspaceSelector = (state: StoreState) => state.workspace

const WorkspaceSelectors = {
  openItems: createSelector([workspaceSelector], (state) => state.items),
  activeItemId: createSelector([workspaceSelector], (state) => state.activeItemId),
  openSideBar: createSelector([workspaceSelector], (state) => state.openSideBar),
  expandedNoteTreeIds: createSelector([workspaceSelector], (state) => state.expandedNoteTreeIds),
}

export default WorkspaceSelectors
