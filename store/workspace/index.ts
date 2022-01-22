import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

type OpenParams = {
  id: string
}
type CloseParams = {
  id: string
}
type ActiveParams = {
  id: string
}
function openItem(state: WorkspaceState, itemId: string) {
  if (state.itemIds.includes(itemId)) {
    return {
      ...state,
      activeItemId: itemId,
    }
  }
  const itemIds = state.itemIds.concat(itemId)
  return {
    ...state,
    itemIds: itemIds,
    activeItemId: itemId,
  }
}
function closeItem(state: WorkspaceState, itemId: string) {
  if (state.itemIds.length === 1) {
    return {
      ...state,
      itemIds: [],
      activeItemId: undefined,
    }
  }
  const index = state.itemIds.indexOf(itemId)
  if (index < 0) {
    return state
  }
  const nextItemId = index === 0 ? state.itemIds[1] : state.itemIds[index - 1]
  const itemIds = state.itemIds.filter((id) => id !== itemId)
  return {
    ...state,
    itemIds: itemIds,
    activeItemId: nextItemId,
  }
}
const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: workspaceInitialState,
  reducers: {
    open: (state: WorkspaceState, action: PayloadAction<OpenParams>) => {
      return openItem(state, action.payload.id)
    },
    close: (state: WorkspaceState, action: PayloadAction<CloseParams>) => {
      return closeItem(state, action.payload.id)
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
      return openItem(state, 'search')
    },
    closeSearchResults: (state: WorkspaceState) => {
      return closeItem(state, 'search')
    },
    openFavorites: (state: WorkspaceState) => {
      return openItem(state, 'favorites')
    },
    closeFavorites: (state: WorkspaceState) => {
      return closeItem(state, 'favorites')
    },
  },
})

export default workspaceSlice