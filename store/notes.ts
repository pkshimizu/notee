import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoreState } from './index'
import { createAsyncAction } from './actions'
import workspaceSlice from './workspace'
import systemSlice from './system'
import sortBy from 'lodash/sortBy'

type Item = {
  id: string
}

export type NoteLog = {
  id: string
  content: string
  updatedAt: string
}

export type NoteDoc = {
  folderId: string
  content: string
  logs: NoteLog[]
  createdAt: string
  updatedAt: string
}

export type Note = {
  title: string
} & Item &
  NoteDoc

export type FolderDoc = {
  folderId?: string
  name: string
}

export type Folder = {
  folders: Folder[]
  notes: Note[]
} & Item &
  FolderDoc

export type NotesState = {
  folders: { [key: string]: Folder }
  notes: { [key: string]: Note }
}

export const notesInitialState: NotesState = {
  folders: {},
  notes: {},
}

// actions
type FetchRootResults = {
  folders: { [key: string]: Folder }
  notes: { [key: string]: Note }
}
export const fetchRoot = createAsyncAction<void, FetchRootResults>(
  'fetchRoot',
  async (params, { noteRepository }, state, dispatch) => {
    const currentUser = state.session.currentUser
    if (currentUser) {
      const folders = await noteRepository.loadFolders(currentUser)
      if (folders === undefined) {
        const newRoot = await noteRepository.createFolder(currentUser, 'マイノート')
        const newFolders: { [key: string]: Folder } = {}
        newFolders[newRoot.id] = newRoot
        return { folders: newFolders, notes: {} }
      }
      const notes = await noteRepository.loadNotes(currentUser)
      noteRepository.onSnapshotFolders(
        currentUser,
        (folder) => {
          dispatch(notesSlice.actions.addFolder({ folder }))
        },
        (folder) => {
          dispatch(notesSlice.actions.modifyFolder({ folder }))
        },
        (folder) => {
          dispatch(notesSlice.actions.removeFolder({ folder }))
        }
      )
      noteRepository.onSnapshotNotes(
        currentUser,
        (note) => {
          dispatch(notesSlice.actions.addNote({ note }))
        },
        (note) => {
          dispatch(notesSlice.actions.modifyNote({ note }))
        },
        (note) => {
          dispatch(notesSlice.actions.removeNote({ note }))
        }
      )
      return { folders: folders, notes: notes }
    }
    return { folders: {}, notes: {} }
  }
)
type FetchNotesResults = {
  notes: { [key: string]: Note }
}
export const fetchNotes = createAsyncAction<void, FetchNotesResults>(
  'fetchNotes',
  async (params, { noteRepository }, state) => {
    const currentUser = state.session.currentUser
    if (currentUser) {
      const notes = await noteRepository.loadNotes(currentUser)
      return {
        notes: notes,
      }
    }
    return {
      notes: state.notes.notes,
    }
  }
)

type CreateFolderParams = {
  name: string
  parentFolder: Folder
}

export const createFolder = createAsyncAction<CreateFolderParams, void>(
  'CreateFolder',
  async (params, { noteRepository }, state, dispatch) => {
    if (state.session.currentUser) {
      await noteRepository.createFolder(state.session.currentUser, params.name, params.parentFolder)
      dispatch(systemSlice.actions.message({ message: '新しいフォルダを作成しました' }))
    }
  }
)

type CreateNoteParams = {
  parentFolder: Folder
}

export const createNote = createAsyncAction<CreateNoteParams, void>(
  'CreateNote',
  async (params, { noteRepository }, state, dispatch) => {
    if (state.session.currentUser) {
      await noteRepository.createNote(state.session.currentUser, params.parentFolder)
      dispatch(systemSlice.actions.message({ message: '新しいノートを作成しました' }))
    }
  }
)

type UpdateFolderParams = {
  folder: Folder
  name?: string
  folderId?: string
}

export const updateFolder = createAsyncAction<UpdateFolderParams, void>(
  'UpdateFolder',
  async (params, { noteRepository }, state) => {
    if (state.session.currentUser) {
      const folder = params.folder
      await noteRepository.updateFolder(state.session.currentUser, folder, params.name, params.folderId)
    }
  }
)

type UpdateNoteParams = {
  note: Note
  content?: string
  folderId?: string
}

export const updateNote = createAsyncAction<UpdateNoteParams, void>(
  'UpdateNote',
  async (params, { noteRepository }, state) => {
    if (state.session.currentUser) {
      await noteRepository.updateNote(state.session.currentUser, params.note, params.content, params.folderId)
    }
  }
)

type DeleteFolderParams = {
  folder: Folder
}

export const deleteFolder = createAsyncAction<DeleteFolderParams, void>(
  'DeleteFolder',
  async (params, { noteRepository }, state, dispatch) => {
    const folder = params.folder
    if (state.session.currentUser) {
      await noteRepository.deleteFolder(state.session.currentUser, folder)
      await dispatch(workspaceSlice.actions.close({ id: params.folder.id }))
      dispatch(systemSlice.actions.message({ message: 'フォルダを削除しました' }))
    }
  }
)

type DeleteNoteParams = {
  note: Note
}

export const deleteNote = createAsyncAction<DeleteNoteParams, void>(
  'DeleteNote',
  async (params, { noteRepository }, state, dispatch) => {
    if (state.session.currentUser) {
      await noteRepository.deleteNote(state.session.currentUser, params.note)
      await dispatch(workspaceSlice.actions.close({ id: params.note.id }))
      dispatch(systemSlice.actions.message({ message: 'ノートを削除しました' }))
    }
  }
)

// selectors
function sortFolders(folders: Folder[]): Folder[] {
  return sortBy(folders, 'name')
}

function sortNotes(notes: Note[]): Note[] {
  return sortBy(notes, 'createdAt').reverse()
}

function buildFolders(folders: Folder[], notes: Note[]) {
  const itemsInFolders: Folder[] = folders.map((folder) => ({ ...folder, folders: [], notes: [] }))
  itemsInFolders.forEach((folder) => {
    folder.folders = sortFolders(itemsInFolders.filter((subFolder) => subFolder.folderId === folder.id))
    folder.notes = sortNotes(notes.filter((note) => note.folderId === folder.id))
  })
  return itemsInFolders
}

const noteSelector = (state: StoreState) => state.notes
export const rootFolderSelector = createSelector([noteSelector], (state) => {
  const folders = buildFolders(Object.values(state.folders), Object.values(state.notes))
  return folders.find((folder) => folder.folderId === undefined)
})
export const foldersSelector = createSelector([noteSelector], (state) => {
  return buildFolders(Object.values(state.folders), Object.values(state.notes))
})
export const notesSelector = createSelector([noteSelector], (state) => Object.values(state.notes))

// slice
type AddFolderParams = {
  folder: Folder
}
type ModifyFolderParams = {
  folder: Folder
}
type RemoveFolderParams = {
  folder: Folder
}
type AddNoteParams = {
  note: Note
}
type ModifyNoteParams = {
  note: Note
}
type RemoveNoteParams = {
  note: Note
}

const notesSlice = createSlice({
  name: 'notes',
  initialState: notesInitialState,
  reducers: {
    addFolder: (state, action: PayloadAction<AddFolderParams>) => {
      const folder = action.payload.folder
      const folders = { ...state.folders }
      folders[folder.id] = folder
      return {
        ...state,
        folders: folders,
      }
    },
    modifyFolder: (state, action: PayloadAction<ModifyFolderParams>) => {
      const folder = action.payload.folder
      const folders = { ...state.folders }
      folders[folder.id] = folder
      return {
        ...state,
        folders: folders,
      }
    },
    removeFolder: (state, action: PayloadAction<RemoveFolderParams>) => {
      const folder = action.payload.folder
      const folders = { ...state.folders }
      delete folders[folder.id]
      return {
        ...state,
        folders: folders,
      }
    },
    addNote: (state, action: PayloadAction<AddNoteParams>) => {
      const note = action.payload.note
      const notes = { ...state.notes }
      notes[note.id] = note
      return {
        ...state,
        notes: notes,
      }
    },
    modifyNote: (state, action: PayloadAction<ModifyNoteParams>) => {
      const note = action.payload.note
      const notes = { ...state.notes }
      notes[note.id] = note
      return {
        ...state,
        notes: notes,
      }
    },
    removeNote: (state, action: PayloadAction<RemoveNoteParams>) => {
      const note = action.payload.note
      const notes = { ...state.notes }
      delete notes[note.id]
      return {
        ...state,
        notes: notes,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoot.fulfilled, (state, action) => ({
      ...state,
      folders: action.payload.folders,
      notes: action.payload.notes,
    }))
    builder.addCase(fetchNotes.fulfilled, (state, action) => ({
      ...state,
      notes: action.payload.notes,
    }))
  },
})

export default notesSlice
