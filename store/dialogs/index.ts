import { Folder, Note, NoteLog } from '../notes/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DialogsState = {
  folderCreate?: Folder
  folderMoveToTrash?: Folder
  folderMove?: Folder
  noteMoveToTrash?: Note
  noteMove?: Note
  noteLog?: { note: Note; log: NoteLog }
}

export const dialogsInitialState: DialogsState = {
  folderCreate: undefined,
  folderMoveToTrash: undefined,
  folderMove: undefined,
  noteMoveToTrash: undefined,
  noteMove: undefined,
  noteLog: undefined,
}

type OpenFolderSettingsDialogParams = {
  folder: Folder
}

type OpenFolderMoveToTrashDialogParams = {
  folder: Folder
}

type OpenFolderMoveDialogParams = {
  folder: Folder
}

type OpenNoteMoveToTrashDialogParams = {
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
    openFolderMoveToTrashDialog: (state: DialogsState, action: PayloadAction<OpenFolderMoveToTrashDialogParams>) => ({
      ...state,
      folderMoveToTrash: action.payload.folder,
    }),
    closeFolderMoveToTrashDialog: (state: DialogsState) => ({
      ...state,
      folderMoveToTrash: undefined,
    }),
    openFolderMoveDialog: (state: DialogsState, action: PayloadAction<OpenFolderMoveDialogParams>) => ({
      ...state,
      folderMove: action.payload.folder,
    }),
    closeFolderMoveDialog: (state: DialogsState) => ({
      ...state,
      folderMove: undefined,
    }),
    openNoteMoveToTrashDialog: (state: DialogsState, action: PayloadAction<OpenNoteMoveToTrashDialogParams>) => ({
      ...state,
      noteMoveToTrash: action.payload.note,
    }),
    closeNoteMoveToTrashDialog: (state: DialogsState) => ({
      ...state,
      noteMoveToTrash: undefined,
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
