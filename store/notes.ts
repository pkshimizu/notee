import { createSelector, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { StoreState } from './index'
import { createAsyncAction } from './actions'

export type Note = {
  id: string
  parentId: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export type FolderDoc = {
  parentId?: string
  name: string
}

export type Folder = {
  id: string
  folders: Folder[]
  notes: Note[]
} & FolderDoc

function makeTitle(content: string): string {
  if (content.length > 0) {
    return content.split('\n')[0]
  }
  return '名前無し'
}

export type NotesState = {
  root?: Folder
}

export const notesInitialState: NotesState = {
  root: undefined,
}

// actions
export const fetchFolders = createAsyncAction<void, void>('fetchFolders', async (params, { noteRepository }, state) => {
  if (state.session.currentUser) {
    const currentUser = state.session.currentUser
    const root = await noteRepository.loadRootFolder(currentUser)
    if (root === undefined) {
      await noteRepository.createFolder(currentUser, '全てのノート')
    }
  }
})

// selectors
const noteSelector = (state: StoreState) => state.notes
export const rootFolderSelector = createSelector([noteSelector], (state) => state.root)
const pickupFolders = (folder: Folder): Folder[] => {
  return folder.folders.flatMap((folder) => pickupFolders(folder)).concat(folder)
}
const pickupNotes = (folder: Folder): Note[] => {
  return folder.folders.flatMap((folder) => pickupNotes(folder)).concat(folder.notes)
}
export const foldersSelector = createSelector([noteSelector], (state) => (state.root ? pickupFolders(state.root) : []))
export const notesSelector = createSelector([noteSelector], (state) => (state.root ? pickupNotes(state.root) : []))

// slice
const notesSlice = createSlice({
  name: 'notes',
  initialState: notesInitialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default notesSlice
