import { Folder, Note, NoteLog } from '../notes/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DialogsState = {
  folderCreate?: Folder
  folderDelete?: Folder
  folderMove?: Folder
  noteDelete?: Note
  noteMove?: Note
  noteLog?: { note: Note; log: NoteLog }
}

export const dialogsInitialState: DialogsState = {
  folderCreate: undefined,
  folderDelete: undefined,
  folderMove: undefined,
  noteDelete: undefined,
  noteMove: undefined,
  noteLog: undefined,
}

type OpenFolderSettingsDialogParams = {
  folder: Folder
}

type OpenFolderDeleteDialogParams = {
  folder: Folder
}

type OpenFolderMoveDialogParams = {
  folder: Folder
}

type OpenNoteDeleteDialogParams = {
  note: Note
}

type OpenNoteMoveDialogParams = {
  note: Note
}

type OpenNoteLogDialogParams = {
  note: Note
  log: NoteLog
}

const dialogsSlice = createSlice({
  name: 'system',
  initialState: dialogsInitialState,
  reducers: {
    openFolderCreateDialog: (state: DialogsState, action: PayloadAction<OpenFolderSettingsDialogParams>) => ({
      ...state,
      folderCreate: action.payload.folder,
    }),
    closeFolderCreateDialog: (state: DialogsState) => ({
      ...state,
      folderCreate: undefined,
    }),
    openFolderDeleteDialog: (state: DialogsState, action: PayloadAction<OpenFolderDeleteDialogParams>) => ({
      ...state,
      folderDelete: action.payload.folder,
    }),
    closeFolderDeleteDialog: (state: DialogsState) => ({
      ...state,
      folderDelete: undefined,
    }),
    openFolderMoveDialog: (state: DialogsState, action: PayloadAction<OpenFolderMoveDialogParams>) => ({
      ...state,
      folderMove: action.payload.folder,
    }),
    closeFolderMoveDialog: (state: DialogsState) => ({
      ...state,
      folderMove: undefined,
    }),
    openNoteDeleteDialog: (state: DialogsState, action: PayloadAction<OpenNoteDeleteDialogParams>) => ({
      ...state,
      noteDelete: action.payload.note,
    }),
    closeNoteDeleteDialog: (state: DialogsState) => ({
      ...state,
      noteDelete: undefined,
    }),
    openNoteMoveDialog: (state: DialogsState, action: PayloadAction<OpenNoteMoveDialogParams>) => ({
      ...state,
      noteMove: action.payload.note,
    }),
    closeNoteMoveDialog: (state: DialogsState) => ({
      ...state,
      noteMove: undefined,
    }),
    openNoteLogDialog: (state: DialogsState, action: PayloadAction<OpenNoteLogDialogParams>) => ({
      ...state,
      noteLog: action.payload,
    }),
    closeNoteLogDialog: (state: DialogsState) => ({
      ...state,
      noteLog: undefined,
    }),
  },
})

export default dialogsSlice
