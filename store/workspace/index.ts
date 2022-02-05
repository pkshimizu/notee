import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type WorkspaceItemType = 'folder' | 'note' | 'search' | 'favorites' | 'trash'

export type WorkspaceItem = {
  id: string
  type: WorkspaceItemType
}

export type WorkspaceState = {
  items: WorkspaceItem[]
  activeItemId?: string
  openSideBar: boolean
  expandedNoteTreeIds: string[]
}

export const workspaceInitialState: WorkspaceState = {
  items: [],
  activeItemId: undefined,
  openSideBar: true,
  expandedNoteTreeIds: [],
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
function openItem(state: WorkspaceState, itemId: string, type: WorkspaceItemType) {
  if (state.items.some((item) => item.id === itemId)) {
    return {
      ...state,
      activeItemId: itemId,
    }
  }
  const items = state.items.concat({ id: itemId, type: type })
  return {
    ...state,
    items: items,
    activeItemId: itemId,
  }
}
type UpdateNoteTreeExpandedParams = {
  ids: string[]
}

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: workspaceInitialState,
  reducers: {
    openNote: (state: WorkspaceState, action: PayloadAction<OpenParams>) => {
      return openItem(state, action.payload.id, 'note')
    },
    openFolder: (state: WorkspaceState, action: PayloadAction<OpenParams>) => {
      return openItem(state, action.payload.id, 'folder')
    },
    close: (state: WorkspaceState, action: PayloadAction<CloseParams>) => ({
      ...state,
      items: state.items.filter((item) => item.id !== action.payload.id),
    }),
    active: (state: WorkspaceState, action: PayloadAction<ActiveParams>) => ({
      ...state,
      activeItemId: action.payload.id,
    }),
    toggleSideBar: (state: WorkspaceState) => ({
      ...state,
      openSideBar: !state.openSideBar,
    }),
    openSearchResults: (state: WorkspaceState) => {
      return openItem(state, 'search', 'search')
    },
    openFavorites: (state: WorkspaceState) => {
      return openItem(state, 'favorites', 'favorites')
    },
    openTrash: (state: WorkspaceState) => {
      return openItem(state, 'trash', 'trash')
    },
    updateNoteTreeExpanded: (state: WorkspaceState, action: PayloadAction<UpdateNoteTreeExpandedParams>) => ({
      ...state,
      expandedNoteTreeIds: action.payload.ids,
    }),
  },
})

export default workspaceSlice
