import { Folder, Note, NoteLog } from '../notes/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DialogsState = {
  folderCreate?: { folder: Folder }
  folderMoveToTrash?: { folder: Folder }
  folderMove?: { folder: Folder }
  noteMoveToTrash?: { note: Note }
  noteMove?: { note: Note }
  noteLog?: { note: Note; log: NoteLog }
  folderDelete?: { folder: Folder }
  noteDelete?: { note: Note }
  trashEmpty?: {}
  fileUpload?: {}
}

export const dialogsInitialState: DialogsState = {
  folderCreate: undefined,
  folderMoveToTrash: undefined,
  folderMove: undefined,
  noteMoveToTrash: undefined,
  noteMove: undefined,
  noteLog: undefined,
  trashEmpty: undefined,
  fileUpload: undefined,
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
    openFolderCreateDialog: (state: DialogsState, action: PayloadAction<OpenFolderSettingsDialogParams>) => {
      state.folderCreate = action.payload
    },
    closeFolderCreateDialog: (state: DialogsState) => {
      state.folderCreate = undefined
    },
    openFolderMoveToTrashDialog: (state: DialogsState, action: PayloadAction<OpenFolderMoveToTrashDialogParams>) => {
      state.folderMoveToTrash = action.payload
    },
    closeFolderMoveToTrashDialog: (state: DialogsState) => {
      state.folderMoveToTrash = undefined
    },
    openFolderMoveDialog: (state: DialogsState, action: PayloadAction<OpenFolderMoveDialogParams>) => {
      state.folderMove = action.payload
    },
    closeFolderMoveDialog: (state: DialogsState) => {
      state.folderMove = undefined
    },
    openNoteMoveToTrashDialog: (state: DialogsState, action: PayloadAction<OpenNoteMoveToTrashDialogParams>) => {
      state.noteMoveToTrash = action.payload
    },
    closeNoteMoveToTrashDialog: (state: DialogsState) => {
      state.noteMoveToTrash = undefined
    },
    openNoteMoveDialog: (state: DialogsState, action: PayloadAction<OpenNoteMoveDialogParams>) => {
      state.noteMove = action.payload
    },
    closeNoteMoveDialog: (state: DialogsState) => {
      state.noteMove = undefined
    },
    openNoteLogDialog: (state: DialogsState, action: PayloadAction<OpenNoteLogDialogParams>) => {
      state.noteLog = action.payload
    },
    closeNoteLogDialog: (state: DialogsState) => {
      state.noteLog = undefined
    },
    openFolderDeleteDialog: (state: DialogsState, action: PayloadAction<OpenFolderDeleteDialogParams>) => {
      state.folderDelete = action.payload
    },
    closeFolderDeleteDialog: (state: DialogsState) => {
      state.folderDelete = undefined
    },
    openNoteDeleteDialog: (state: DialogsState, action: PayloadAction<OpenNoteDeleteDialogParams>) => {
      state.noteDelete = action.payload
    },
    closeNoteDeleteDialog: (state: DialogsState) => {
      state.noteDelete = undefined
    },
    openTrashEmptyDialog: (state: DialogsState) => {
      state.trashEmpty = {}
    },
    closeTrashEmptyDialog: (state: DialogsState) => {
      state.trashEmpty = undefined
    },
    openFileUploadDialog: (state: DialogsState) => {
      state.fileUpload = {}
    },
    closeFileUploadDialog: (state: DialogsState) => {
      state.fileUpload = undefined
    },
  },
})

export default dialogsSlice
