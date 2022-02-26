import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type WorkspaceItemType = 'folder' | 'note' | 'search' | 'favorites' | 'trash' | 'recent'

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
  if (!state.items.some((item) => item.id === itemId)) {
    state.items.push({ id: itemId, type: type })
  }
  state.activeItemId = itemId
}
type UpdateNoteTreeExpandedParams = {
  ids: string[]
}

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: workspaceInitialState,
  reducers: {
    openNote: (state: WorkspaceState, action: PayloadAction<OpenParams>) => {
      openItem(state, action.payload.id, 'note')
    },
    openFolder: (state: WorkspaceState, action: PayloadAction<OpenParams>) => {
      openItem(state, action.payload.id, 'folder')
    },
    close: (state: WorkspaceState, action: PayloadAction<CloseParams>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id)
    },
    active: (state: WorkspaceState, action: PayloadAction<ActiveParams>) => {
      state.activeItemId = action.payload.id
    },
    toggleSideBar: (state: WorkspaceState) => {
      state.openSideBar = !state.openSideBar
    },
    openSearchResults: (state: WorkspaceState) => {
      openItem(state, 'search', 'search')
    },
    openFavorites: (state: WorkspaceState) => {
      openItem(state, 'favorites', 'favorites')
    },
    openRecent: (state: WorkspaceState) => {
      openItem(state, 'recent', 'recent')
    },
    openTrash: (state: WorkspaceState) => {
      openItem(state, 'trash', 'trash')
    },
    updateNoteTreeExpanded: (state: WorkspaceState, action: PayloadAction<UpdateNoteTreeExpandedParams>) => {
      state.expandedNoteTreeIds = action.payload.ids
    },
  },
})

export default workspaceSlice
