import { createAsyncAction } from '../actions'
import systemSlice from '../system'
import { Folder, Note } from './models'
import notesSlice from '.'
import { ContentType } from '../../components/atoms/inputs/TextEditor'
import { StoreState } from '../index'

type FetchRootResults = {
  folders: { [key: string]: Folder }
  notes: { [key: string]: Note }
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

type MoveFolderToTrashParams = {
  folder: Folder
}

type MoveNoteToTrashParams = {
  note: Note
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
}

type DeleteFolderParams = {
  folder: Folder
}

type DeleteNoteParams = {
  note: Note
}

function confirmInsufficientCapacity(state: StoreState) {
  const usage = state.notes.usageFolderCapacity + state.notes.usageNoteCapacity
  const max = state.session.maxCapacity
  if (usage > max) {
    throw new Error('Could not save due to insufficient capacity')
  }
}

const NotesActions = {
  fetchRoot: createAsyncAction<void, FetchRootResults>(
    'fetchRoot',
    async (params, { noteRepository }, state, dispatch) => {
      const currentUser = state.session.currentUser
      if (currentUser) {
        const folders = await noteRepository.loadFolders(currentUser)
        if (folders === undefined) {
          const newRoot = await noteRepository.createFolder(currentUser, 'My Notes')
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

  moveFolderToTrash: createAsyncAction<MoveFolderToTrashParams, void>(
    'moveFolderToTrash',
    async (params, { noteRepository }, state, dispatch) => {
      const folder = params.folder
      if (state.session.currentUser) {
        await noteRepository.updateDeletedAtFolder(state.session.currentUser, folder)
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
        await noteRepository.resetDeletedAtFolder(state.session.currentUser, params.folder)
        dispatch(systemSlice.actions.message({ message: { value: `Restored folder.` } }))
      }
      if (params.note) {
        await noteRepository.resetDeletedAtNote(state.session.currentUser, params.note)
        dispatch(systemSlice.actions.message({ message: { value: `Restored note.` } }))
      }
    }
  }),

  deleteFolder: createAsyncAction<DeleteFolderParams, void>(
    'deleteFolder',
    async (params, { noteRepository }, state, dispatch) => {
      const folder = params.folder
      if (state.session.currentUser) {
        await noteRepository.deleteFolder(state.session.currentUser, folder)
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
}

export default NotesActions
