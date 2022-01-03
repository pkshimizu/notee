import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoreState } from './index'
import { Folder, Note } from './notes'

export type DialogsState = {
  settingsFolder?: Folder
  deleteFolder?: Folder
  deleteNote?: Note
}

export const dialogsInitialState: DialogsState = {
  settingsFolder: undefined,
  deleteFolder: undefined,
  deleteNote: undefined,
}

// selector
const dialogsSelector = (state: StoreState) => state.dialogs
export const dialogsSettingsFolderSelector = createSelector([dialogsSelector], (state) => state.settingsFolder)
export const dialogsDeleteFolderSelector = createSelector([dialogsSelector], (state) => state.deleteFolder)
export const dialogsDeleteNoteSelector = createSelector([dialogsSelector], (state) => state.deleteNote)

type OpenFolderSettingsDialogParams = {
  folder: Folder
}

type OpenFolderDeleteDialogParams = {
  folder: Folder
}

type OpenNoteDeleteDialogParams = {
  note: Note
}

const dialogsSlice = createSlice({
  name: 'system',
  initialState: dialogsInitialState,
  reducers: {
    openFolderSettingsDialog: (state: DialogsState, action: PayloadAction<OpenFolderSettingsDialogParams>) => ({
      ...state,
      settingsFolder: action.payload.folder,
    }),
    closeFolderSettingsDialog: (state: DialogsState) => ({
      ...state,
      settingsFolder: undefined,
    }),
    openFolderDeleteDialog: (state: DialogsState, action: PayloadAction<OpenFolderDeleteDialogParams>) => ({
      ...state,
      deleteFolder: action.payload.folder,
    }),
    closeFolderDeleteDialog: (state: DialogsState) => ({
      ...state,
      deleteFolder: undefined,
    }),
    openNoteDeleteDialog: (state: DialogsState, action: PayloadAction<OpenNoteDeleteDialogParams>) => ({
      ...state,
      deleteNote: action.payload.note,
    }),
    closeNoteDeleteDialog: (state: DialogsState) => ({
      ...state,
      deleteNote: undefined,
    }),
  },
})

export default dialogsSlice
