import { createSelector, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { StoreState } from './index'
import { createAsyncAction } from './actions'

export type NoteDoc = {
  folderId: string
  content: string
  createdAt: string
  updatedAt: string
}

export type Note = {
  id: string
  title: string
} & NoteDoc

export type FolderDoc = {
  folderId?: string
  name: string
}

export type Folder = {
  id: string
  folders: Folder[]
  notes: Note[]
} & FolderDoc

export type NotesState = {
  root?: Folder
}

export const notesInitialState: NotesState = {
  root: undefined,
}

// actions
type FetchRootResults = {
  root?: Folder
}
const fetchNoteToFolder = (folder: Folder, note: Note) => {
  if (folder.id === note.folderId) {
    folder.notes.push(note)
    return true
  }
  folder.folders.forEach((subFolder) => fetchNoteToFolder(subFolder, note))
}
export const fetchRoot = createAsyncAction<void, FetchRootResults>(
  'fetchRoot',
  async (params, { noteRepository }, state) => {
    if (state.session.currentUser) {
      const currentUser = state.session.currentUser
      const root = await noteRepository.loadRootFolder(currentUser)
      if (root === undefined) {
        return { root: await noteRepository.createFolder(currentUser, 'マイノート') }
      }
      const notes = await noteRepository.loadNotes(currentUser)
      notes.forEach((note) => fetchNoteToFolder(root, note))
      return { root: root }
    }
    return { root: undefined }
  }
)

type CreateFolderParams = {
  name: string
  parentFolder: Folder
}

export const createFolder = createAsyncAction<CreateFolderParams, void>(
  'CreateFolder',
  async (params, { noteRepository }, state) => {
    if (state.session.currentUser) {
      await noteRepository.createFolder(state.session.currentUser, params.name, params.parentFolder)
    }
  }
)

type CreateNoteParams = {
  parentFolder: Folder
}

export const createNote = createAsyncAction<CreateNoteParams, void>(
  'CreateNote',
  async (params, { noteRepository }, state) => {
    if (state.session.currentUser) {
      await noteRepository.createNote(state.session.currentUser, params.parentFolder)
    }
  }
)

type DeleteFolderParams = {
  folder: Folder
}

export const deleteFolder = createAsyncAction<DeleteFolderParams, void>(
  'DeleteFolder',
  async (params, repositories, state) => {}
)

type DeleteNoteParams = {
  note: Note
}

export const deleteNote = createAsyncAction<DeleteNoteParams, void>(
  'DeleteNote',
  async (params, repositories, state) => {}
)

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
  extraReducers: (builder) => {
    builder.addCase(fetchRoot.fulfilled, (state, action) => ({
      ...state,
      root: action.payload.root,
    }))
  },
})

export default notesSlice
