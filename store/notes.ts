import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoreState } from './index'
import { createAsyncAction } from './actions'
import workspaceSlice from './workspace'
import systemSlice from './system'

type Item = {
  id: string
}

export type NoteDoc = {
  folderId: string
  content: string
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
  async (params, { noteRepository }, state, dispatch) => {
    if (state.session.currentUser) {
      const currentUser = state.session.currentUser
      const root = await noteRepository.loadRootFolder(currentUser)
      if (root === undefined) {
        return { root: await noteRepository.createFolder(currentUser, 'マイノート') }
      }
      const notes = await noteRepository.loadNotes(currentUser)
      notes.forEach((note) => fetchNoteToFolder(root, note))
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
  name: string
}

export const updateFolder = createAsyncAction<UpdateFolderParams, void>(
  'UpdateFolder',
  async (params, { noteRepository }, state) => {
    if (state.session.currentUser) {
      await noteRepository.updateFolder(state.session.currentUser, params.folder, params.name)
    }
  }
)

type UpdateNoteParams = {
  note: Note
  content: string
}

export const updateNote = createAsyncAction<UpdateNoteParams, void>(
  'UpdateNote',
  async (params, { noteRepository }, state) => {
    if (state.session.currentUser) {
      await noteRepository.updateNote(state.session.currentUser, params.note, params.content)
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
const addFolder = (folder: Folder, addedFolder: Folder): Folder => {
  if (folder.id === addedFolder.folderId) {
    if (folder.folders.some((subFolder) => subFolder.id === addedFolder.id)) {
      return folder
    }
    return {
      ...folder,
      folders: folder.folders.concat(addedFolder),
    }
  }
  return {
    ...folder,
    folders: folder.folders.map((subFolder) => addFolder(subFolder, addedFolder)),
  }
}
const modifyFolder = (folder: Folder, modifiedFolder: Folder): Folder => {
  if (folder.folderId === undefined && modifiedFolder.folderId === undefined) {
    return {
      ...folder,
      name: modifiedFolder.name,
    }
  }
  if (folder.id === modifiedFolder.folderId) {
    return {
      ...folder,
      folders: folder.folders.map((subFolder) =>
        subFolder.id === modifiedFolder.id
          ? {
              ...subFolder,
              name: modifiedFolder.name,
            }
          : subFolder
      ),
    }
  }
  return {
    ...folder,
    folders: folder.folders.map((subFolder) => modifyFolder(subFolder, modifiedFolder)),
  }
}
const removeFolder = (folder: Folder, removedFolder: Folder): Folder => {
  if (folder.id === removedFolder.folderId) {
    return {
      ...folder,
      folders: folder.folders.filter((subFolder) => subFolder.id !== removedFolder.id),
    }
  }
  return {
    ...folder,
    folders: folder.folders.map((subFolder) => removeFolder(subFolder, removedFolder)),
  }
}
const addNote = (folder: Folder, addedNote: Note): Folder => {
  if (folder.id === addedNote.folderId) {
    if (folder.notes.some((note) => note.id === addedNote.id)) {
      return folder
    }
    return {
      ...folder,
      notes: folder.notes.concat(addedNote),
    }
  }
  return {
    ...folder,
    folders: folder.folders.map((subFolder) => addNote(subFolder, addedNote)),
  }
}
const modifyNote = (folder: Folder, modifiedNote: Note): Folder => {
  if (folder.id === modifiedNote.folderId) {
    return {
      ...folder,
      notes: folder.notes.map((note) => (note.id === modifiedNote.id ? modifiedNote : note)),
    }
  }
  return {
    ...folder,
    folders: folder.folders.map((subFolder) => modifyNote(subFolder, modifiedNote)),
  }
}
const removeNote = (folder: Folder, removedNote: Note): Folder => {
  if (folder.id === removedNote.folderId) {
    return {
      ...folder,
      notes: folder.notes.filter((note) => note.id !== removedNote.id),
    }
  }
  return {
    ...folder,
    folders: folder.folders.map((subFolder) => removeNote(subFolder, removedNote)),
  }
}
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
    addFolder: (state, action: PayloadAction<AddFolderParams>) => ({
      ...state,
      root: state.root ? addFolder(state.root, action.payload.folder) : undefined,
    }),
    modifyFolder: (state, action: PayloadAction<ModifyFolderParams>) => ({
      ...state,
      root: state.root ? modifyFolder(state.root, action.payload.folder) : undefined,
    }),
    removeFolder: (state, action: PayloadAction<RemoveFolderParams>) => ({
      ...state,
      root: state.root ? removeFolder(state.root, action.payload.folder) : undefined,
    }),
    addNote: (state, action: PayloadAction<AddNoteParams>) => ({
      ...state,
      root: state.root ? addNote(state.root, action.payload.note) : undefined,
    }),
    modifyNote: (state, action: PayloadAction<ModifyNoteParams>) => ({
      ...state,
      root: state.root ? modifyNote(state.root, action.payload.note) : undefined,
    }),
    removeNote: (state, action: PayloadAction<RemoveNoteParams>) => ({
      ...state,
      root: state.root ? removeNote(state.root, action.payload.note) : undefined,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoot.fulfilled, (state, action) => ({
      ...state,
      root: action.payload.root,
    }))
  },
})

export default notesSlice
