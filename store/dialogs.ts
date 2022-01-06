import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoreState } from './index'
import { Folder, Note, NoteLog } from './notes'

export type DialogsState = {
  folderSettings?: Folder
  folderDelete?: Folder
  noteDelete?: Note
  noteLog?: { note: Note; log: NoteLog }
}

export const dialogsInitialState: DialogsState = {
  folderSettings: undefined,
  folderDelete: undefined,
  noteDelete: undefined,
  noteLog: undefined,
}

// selector
const dialogsSelector = (state: StoreState) => state.dialogs
export const dialogsFolderSettingsSelector = createSelector([dialogsSelector], (state) => state.folderSettings)
export const dialogsFolderDeleteSelector = createSelector([dialogsSelector], (state) => state.folderDelete)
export const dialogsNoteDeleteSelector = createSelector([dialogsSelector], (state) => state.noteDelete)
export const dialogsNoteLogSelector = createSelector([dialogsSelector], (state) => state.noteLog)

type OpenFolderSettingsDialogParams = {
  folder: Folder
}

type OpenFolderDeleteDialogParams = {
  folder: Folder
}

type OpenNoteDeleteDialogParams = {
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
    openFolderSettingsDialog: (state: DialogsState, action: PayloadAction<OpenFolderSettingsDialogParams>) => ({
      ...state,
      folderSettings: action.payload.folder,
    }),
    closeFolderSettingsDialog: (state: DialogsState) => ({
      ...state,
      folderSettings: undefined,
    }),
    openFolderDeleteDialog: (state: DialogsState, action: PayloadAction<OpenFolderDeleteDialogParams>) => ({
      ...state,
      folderDelete: action.payload.folder,
    }),
    closeFolderDeleteDialog: (state: DialogsState) => ({
      ...state,
      folderDelete: undefined,
    }),
    openNoteDeleteDialog: (state: DialogsState, action: PayloadAction<OpenNoteDeleteDialogParams>) => ({
      ...state,
      noteDelete: action.payload.note,
    }),
    closeNoteDeleteDialog: (state: DialogsState) => ({
      ...state,
      noteDelete: undefined,
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
