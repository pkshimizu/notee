import { createAsyncAction } from '../actions'
import systemSlice from '../system'
import { FileMeta, Folder, Note } from './models'
import notesSlice from '.'
import { ContentType } from '../../components/atoms/inputs/TextEditor'
import { StoreState } from '../index'
import { v4 } from 'uuid'
import NoteRepository from '../../repositories/NoteRepository'
import { User } from '../session/models'
import FileRepository from '../../repositories/FileRepository'

type FetchRootResults = {
  folders: { [key: string]: Folder }
  notes: { [key: string]: Note }
  files: FileMeta[]
}

type FetchNotesResults = {
  notes: { [key: string]: Note }
}

type CreateFolderParams = {
  name: string
  parentFolder: Folder
}

type CreateNoteParams = {
  parentFolder: Folder
}

type CreateFilesParams = {
  files: File[]
  parentFolder: Folder
}

type UpdateFolderParams = {
  folder: Folder
  name?: string
  folderId?: string
}

type UpdateNoteParams = {
  note: Note
  content?: string
  folderId?: string
  contentType?: ContentType
}

type UpdateFileParams = {
  file: FileMeta
  name?: string
  folderId?: string
}

type MoveFolderToTrashParams = {
  folder: Folder
}

type MoveNoteToTrashParams = {
  note: Note
}

type MoveFileToTrashParams = {
  file: FileMeta
}

type FavoriteParams = {
  folder?: Folder
  note?: Note
}

type UnFavoriteParams = {
  folder?: Folder
  note?: Note
}

type RestoreParams = {
  folder?: Folder
  note?: Note
  file?: FileMeta
}

type DeleteFolderParams = {
  folder: Folder
}

type DeleteNoteParams = {
  note: Note
}

type DeleteFileParams = {
  file: FileMeta
}

type EmptyTrashParams = {
  folders: Folder[]
  notes: Note[]
  files: FileMeta[]
}

type ClearLogsParams = {
  note: Note
}

function confirmInsufficientCapacity(state: StoreState) {
  const usage = state.notes.usageFolderCapacity + state.notes.usageNoteCapacity + state.notes.usageFileCapacity
  const max = state.session.maxCapacity
  if (usage > max) {
    throw new Error('Could not save due to insufficient capacity')
  }
}

function confirmInsufficientStorageCapacity(state: StoreState, fileSize: number) {
  const usage = state.notes.usageStorageCapacity
  const max = state.session.maxStorageCapacity
  if (usage + fileSize > max) {
    throw new Error('Could not upload due to insufficient capacity')
  }
}

async function moveFolderToTrash(user: User, noteRepository: NoteRepository, folder: Folder) {
  for (const subFolder of folder.folders) {
    await moveFolderToTrash(user, noteRepository, subFolder)
  }
  for (const note of folder.notes) {
    await noteRepository.updateDeletedAtNote(user, note)
  }
  for (const file of folder.files) {
    await noteRepository.updateDeletedAtFile(user, file)
  }
  await noteRepository.updateDeletedAtFolder(user, folder)
}

async function restoreFolder(user: User, noteRepository: NoteRepository, folder: Folder) {
  for (const subFolder of folder.folders) {
    await restoreFolder(user, noteRepository, subFolder)
  }
  for (const note of folder.notes) {
    await noteRepository.resetDeletedAtNote(user, note)
  }
  for (const file of folder.files) {
    await noteRepository.resetDeletedAtFile(user, file)
  }
  await noteRepository.resetDeletedAtFolder(user, folder)
}

async function deleteFolder(
  user: User,
  noteRepository: NoteRepository,
  fileRepository: FileRepository,
  folder: Folder
) {
  for (const subFolder of folder.folders) {
    await deleteFolder(user, noteRepository, fileRepository, subFolder)
  }
  for (const note of folder.notes) {
    await noteRepository.deleteNote(user, note)
  }
  for (const file of folder.files) {
    await noteRepository.deleteFile(user, file)
    await fileRepository.delete(user, file.uuid)
  }
  await noteRepository.deleteFolder(user, folder)
}

const NotesActions = {
  fetchRoot: createAsyncAction<void, FetchRootResults>(
    'fetchRoot',
    async (params, { noteRepository, fileRepository }, state, dispatch) => {
      const currentUser = state.session.currentUser
      if (currentUser) {
        const folders = await noteRepository.loadFolders(currentUser)
        if (folders === undefined) {
          const newRoot = await noteRepository.createFolder(currentUser, 'My Notes')
          const newFolders: { [key: string]: Folder } = {}
          newFolders[newRoot.id] = newRoot
          return { folders: newFolders, notes: {}, files: [] }
        }
        const notes = await noteRepository.loadNotes(currentUser)
        const files = await noteRepository.loadFiles(currentUser)
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
        noteRepository.onSnapshotFiles(
          currentUser,
          async (file) => {
            const url = await fileRepository.url(currentUser, file.uuid)
            dispatch(notesSlice.actions.addFile({ file: { ...file, url } }))
          },
          async (file) => {
            const url = await fileRepository.url(currentUser, file.uuid)
            dispatch(notesSlice.actions.modifyFile({ file: { ...file, url } }))
          },
          async (file) => {
            dispatch(notesSlice.actions.removeFile({ file: { ...file } }))
          }
        )
        return { folders: folders, notes: notes, files: files }
      }
      return { folders: {}, notes: {}, files: [] }
    }
  ),
  fetchNotes: createAsyncAction<void, FetchNotesResults>('fetchNotes', async (params, { noteRepository }, state) => {
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
  }),

  createFolder: createAsyncAction<CreateFolderParams, void>(
    'CreateFolder',
    async (params, { noteRepository }, state, dispatch) => {
      if (state.session.currentUser) {
        confirmInsufficientCapacity(state)
        await noteRepository.createFolder(state.session.currentUser, params.name, params.parentFolder)
        dispatch(systemSlice.actions.message({ message: { value: 'Created new folder.' } }))
      }
    }
  ),

  createNote: createAsyncAction<CreateNoteParams, void>(
    'CreateNote',
    async (params, { noteRepository }, state, dispatch) => {
      if (state.session.currentUser) {
        confirmInsufficientCapacity(state)
        await noteRepository.createNote(state.session.currentUser, params.parentFolder)
        dispatch(systemSlice.actions.message({ message: { value: 'Created new note.' } }))
      }
    }
  ),

  createFiles: createAsyncAction<CreateFilesParams, void>(
    'CreateFile',
    async (params, { noteRepository, fileRepository }, state, dispatch) => {
      if (state.session.currentUser) {
        const fileSize = params.files.map((file) => file.size).reduce((prev, current) => prev + current)
        confirmInsufficientCapacity(state)
        confirmInsufficientStorageCapacity(state, fileSize)
        for (const file of params.files) {
          const uuid = v4()
          await fileRepository.upload(state.session.currentUser, uuid, file)
          const fileAttributes = await noteRepository.createFile(
            state.session.currentUser,
            uuid,
            file.name,
            file.size,
            params.parentFolder
          )
        }
        dispatch(systemSlice.actions.message({ message: { value: 'File uploaded' } }))
      }
    }
  ),

  updateFolder: createAsyncAction<UpdateFolderParams, void>(
    'UpdateFolder',
    async (params, { noteRepository }, state) => {
      if (state.session.currentUser) {
        confirmInsufficientCapacity(state)
        const folder = params.folder
        await noteRepository.updateFolder(state.session.currentUser, folder, {
          name: params.name,
          folderId: params.folderId,
        })
      }
    }
  ),

  updateNote: createAsyncAction<UpdateNoteParams, void>('UpdateNote', async (params, { noteRepository }, state) => {
    if (state.session.currentUser) {
      confirmInsufficientCapacity(state)
      await noteRepository.updateNote(state.session.currentUser, params.note, {
        content: params.content,
        folderId: params.folderId,
        contentType: params.contentType,
      })
    }
  }),

  updateFile: createAsyncAction<UpdateFileParams, void>('UpdateFile', async (params, { noteRepository }, state) => {
    if (state.session.currentUser) {
      confirmInsufficientCapacity(state)
      await noteRepository.updateFile(state.session.currentUser, params.file, {
        name: params.name,
        folderId: params.folderId,
      })
    }
  }),

  moveFolderToTrash: createAsyncAction<MoveFolderToTrashParams, void>(
    'moveFolderToTrash',
    async (params, { noteRepository }, state, dispatch) => {
      const folder = params.folder
      if (state.session.currentUser) {
        await moveFolderToTrash(state.session.currentUser, noteRepository, folder)
        dispatch(systemSlice.actions.message({ message: { value: 'Moved folder to trash' } }))
      }
    }
  ),

  moveNoteToTrash: createAsyncAction<MoveNoteToTrashParams, void>(
    'MoveNoteToTrash',
    async (params, { noteRepository }, state, dispatch) => {
      if (state.session.currentUser) {
        await noteRepository.updateDeletedAtNote(state.session.currentUser, params.note)
        dispatch(systemSlice.actions.message({ message: { value: 'Moved note to trash' } }))
      }
    }
  ),

  moveFileToTrash: createAsyncAction<MoveFileToTrashParams, void>(
    'MoveFileToTrash',
    async (params, { noteRepository }, state, dispatch) => {
      if (state.session.currentUser) {
        await noteRepository.updateDeletedAtFile(state.session.currentUser, params.file)
        dispatch(systemSlice.actions.message({ message: { value: 'Moved file to trash' } }))
      }
    }
  ),

  favorite: createAsyncAction<FavoriteParams, void>(
    'FavoriteFolder',
    async (params, { noteRepository }, state, dispatch) => {
      if (state.session.currentUser) {
        if (params.folder) {
          await noteRepository.updateFolder(state.session.currentUser, params.folder, { favorite: true })
          dispatch(systemSlice.actions.message({ message: { value: `Added folder to favorites.` } }))
        }
        if (params.note) {
          await noteRepository.updateNote(state.session.currentUser, params.note, { favorite: true })
          dispatch(systemSlice.actions.message({ message: { value: `Added note to favorites.` } }))
        }
      }
    }
  ),

  unFavorite: createAsyncAction<UnFavoriteParams, void>(
    'UnFavorite',
    async (params, { noteRepository }, state, dispatch) => {
      if (state.session.currentUser) {
        if (params.folder) {
          await noteRepository.updateFolder(state.session.currentUser, params.folder, { favorite: false })
          dispatch(systemSlice.actions.message({ message: { value: `Removed folder from favorites.` } }))
        }
        if (params.note) {
          await noteRepository.updateNote(state.session.currentUser, params.note, { favorite: false })
          dispatch(systemSlice.actions.message({ message: { value: `Removed note from favorites.` } }))
        }
      }
    }
  ),

  restore: createAsyncAction<RestoreParams, void>('restore', async (params, { noteRepository }, state, dispatch) => {
    if (state.session.currentUser) {
      confirmInsufficientCapacity(state)
      if (params.folder) {
        await restoreFolder(state.session.currentUser, noteRepository, params.folder)
        dispatch(systemSlice.actions.message({ message: { value: `Restored folder.` } }))
      }
      if (params.note) {
        await noteRepository.resetDeletedAtNote(state.session.currentUser, params.note)
        dispatch(systemSlice.actions.message({ message: { value: `Restored note.` } }))
      }
      if (params.file) {
        await noteRepository.resetDeletedAtFile(state.session.currentUser, params.file)
        dispatch(systemSlice.actions.message({ message: { value: `Restored file.` } }))
      }
    }
  }),

  deleteFolder: createAsyncAction<DeleteFolderParams, void>(
    'deleteFolder',
    async (params, { noteRepository, fileRepository }, state, dispatch) => {
      const folder = params.folder
      if (state.session.currentUser) {
        await deleteFolder(state.session.currentUser, noteRepository, fileRepository, folder)
        dispatch(systemSlice.actions.message({ message: { value: 'Deleted folder' } }))
      }
    }
  ),

  deleteNote: createAsyncAction<DeleteNoteParams, void>(
    'DeleteNote',
    async (params, { noteRepository }, state, dispatch) => {
      if (state.session.currentUser) {
        await noteRepository.deleteNote(state.session.currentUser, params.note)
        dispatch(systemSlice.actions.message({ message: { value: 'Deleted note' } }))
      }
    }
  ),

  deleteFile: createAsyncAction<DeleteFileParams, void>(
    'DeleteFile',
    async (params, { noteRepository, fileRepository }, state, dispatch) => {
      if (state.session.currentUser) {
        await noteRepository.deleteFile(state.session.currentUser, params.file)
        await fileRepository.delete(state.session.currentUser, params.file.uuid)
        dispatch(systemSlice.actions.message({ message: { value: 'Deleted file' } }))
      }
    }
  ),
  emptyTrash: createAsyncAction<EmptyTrashParams, void>(
    'emptyTrash',
    async (params, { noteRepository, fileRepository }, state) => {
      const user = state.session.currentUser
      if (user) {
        for (const folder of params.folders) {
          await deleteFolder(user, noteRepository, fileRepository, folder)
        }
        for (const note of params.notes) {
          await noteRepository.deleteNote(user, note)
        }
        for (const file of params.files) {
          await noteRepository.deleteFile(user, file)
          await fileRepository.delete(user, file.uuid)
        }
      }
    }
  ),
  clearLogs: createAsyncAction<ClearLogsParams, void>('clearLogs', async (params, { noteRepository }, state) => {
    if (state.session.currentUser) {
      await noteRepository.clearLogs(state.session.currentUser, params.note)
    }
  }),
}

export default NotesActions
