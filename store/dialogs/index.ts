import { File, Folder, Note, NoteLog } from '../notes/models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import NotesActions from '../notes/actions'

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
  fileUpload?: { folder: Folder }
  fileMove?: { file: File }
  fileMoveToTrash?: { file: File }
  fileDelete?: { file: File }
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
  fileMove: undefined,
  fileMoveToTrash: undefined,
  fileDelete: undefined,
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

type OpenFileUploadDialogParams = {
  folder: Folder
}

type OpenFileMoveDialogParams = {
  file: File
}

type OpenFileMoveToTrashDialogParams = {
  file: File
}

type OpenFileDeleteDialogParams = {
  file: File
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
    openFileUploadDialog: (state: DialogsState, action: PayloadAction<OpenFileUploadDialogParams>) => {
      state.fileUpload = { folder: action.payload.folder }
    },
    closeFileUploadDialog: (state: DialogsState) => {
      state.fileUpload = undefined
    },
    openFileMoveDialog: (state: DialogsState, action: PayloadAction<OpenFileMoveDialogParams>) => {
      state.fileMove = { file: action.payload.file }
    },
    closeFileMoveDialog: (state: DialogsState) => {
      state.fileMove = undefined
    },
    openFileMoveToTrashDialog: (state: DialogsState, action: PayloadAction<OpenFileMoveToTrashDialogParams>) => {
      state.fileMoveToTrash = { file: action.payload.file }
    },
    closeFileMoveToTrashDialog: (state: DialogsState) => {
      state.fileMoveToTrash = undefined
    },
    openFileDeleteDialog: (state: DialogsState, action: PayloadAction<OpenFileDeleteDialogParams>) => {
      state.fileDelete = { file: action.payload.file }
    },
    closeFileDeleteDialog: (state: DialogsState) => {
      state.fileDelete = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(NotesActions.createFolder.fulfilled, (state) => {
        state.folderCreate = undefined
      })
      .addCase(NotesActions.moveFolderToTrash.fulfilled, (state) => {
        state.folderMoveToTrash = undefined
      })
      .addCase(NotesActions.updateFolder.fulfilled, (state) => {
        state.folderMove = undefined
      })
      .addCase(NotesActions.deleteFolder.fulfilled, (state) => {
        state.folderDelete = undefined
      })
      .addCase(NotesActions.moveNoteToTrash.fulfilled, (state) => {
        state.noteMoveToTrash = undefined
      })
      .addCase(NotesActions.updateNote.fulfilled, (state) => {
        state.noteMove = undefined
        state.noteLog = undefined
      })
      .addCase(NotesActions.deleteNote.fulfilled, (state) => {
        state.noteDelete = undefined
      })
      .addCase(NotesActions.emptyTrash.fulfilled, (state) => {
        state.trashEmpty = undefined
      })
      .addCase(NotesActions.createFiles.fulfilled, (state) => {
        state.fileUpload = undefined
      })
      .addCase(NotesActions.updateFile.fulfilled, (state) => {
        state.fileMove = undefined
      })
      .addCase(NotesActions.moveFileToTrash.fulfilled, (state) => {
        state.fileMoveToTrash = undefined
      })
      .addCase(NotesActions.deleteFile.fulfilled, (state) => {
        state.fileDelete = undefined
      })
  },
})

export default dialogsSlice
