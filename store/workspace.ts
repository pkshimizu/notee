import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoreState } from './index'

export type WorkspaceState = {
  itemIds: string[]
  activeItemId?: string
  openSideBar: boolean
}

export const workspaceInitialState: WorkspaceState = {
  itemIds: [],
  activeItemId: undefined,
  openSideBar: true,
}

// actions

// selectors
const workspaceSelector = (state: StoreState) => state.workspace
export const openItemIdsSelector = createSelector([workspaceSelector], (state) => state.itemIds)
export const activeItemIdSelector = createSelector([workspaceSelector], (state) => state.activeItemId)
export const openSideBarSelector = createSelector([workspaceSelector], (state) => state.openSideBar)

// slice
type OpenParams = {
  id: string
}
type CloseParams = {
  id: string
}
type ActiveParams = {
  id: string
}
const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: workspaceInitialState,
  reducers: {
    open: (state: WorkspaceState, action: PayloadAction<OpenParams>) => {
      if (state.itemIds.includes(action.payload.id)) {
        return {
          ...state,
          activeItemId: action.payload.id,
        }
      }
      return {
        ...state,
        itemIds: state.itemIds.concat(action.payload.id),
        activeItemId: action.payload.id,
      }
    },
    close: (state: WorkspaceState, action: PayloadAction<CloseParams>) => {
      if (state.itemIds.length === 1) {
        return {
          ...state,
          itemIds: [],
          activeItemId: undefined,
        }
      }
      const index = state.itemIds.indexOf(action.payload.id)
      if (index < 0) {
        return state
      }
      const nextItemId = index === 0 ? state.itemIds[1] : state.itemIds[index - 1]
      const itemIds = state.itemIds.filter((id) => id !== action.payload.id)
      return {
        ...state,
        itemIds: itemIds,
        activeItemId: nextItemId,
      }
    },
    active: (state: WorkspaceState, action: PayloadAction<ActiveParams>) => ({
      ...state,
      activeItemId: action.payload.id,
    }),
    toggleSideBar: (state: WorkspaceState) => ({
      ...state,
      openSideBar: !state.openSideBar,
    }),
    openSearchResults: (state: WorkspaceState) => {
      if (state.itemIds.includes('search')) {
        return {
          ...state,
          activeItemId: 'search',
        }
      }
      return {
        ...state,
        itemIds: state.itemIds.concat('search'),
        activeItemId: 'search',
      }
    },
  },
})

export default workspaceSlice
