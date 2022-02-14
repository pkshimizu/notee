import { createAsyncAction } from '../actions'
import systemSlice from '../system'
import { Folder, Note } from '../notes/models'
import notesSlice from '.'
import { ContentType } from '../../components/atoms/inputs/TextEditor'
import { useNote } from '../../hooks/useNote'

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
      dispatch(systemSlice.actions.message({ message: 'A new folder has been created' }))
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
      dispatch(systemSlice.actions.message({ message: 'A new note has been created' }))
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
      await noteRepository.updateFolder(state.session.currentUser, folder, {
        name: params.name,
        folderId: params.folderId,
      })
    }
  }
)

type UpdateNoteParams = {
  note: Note
  content?: string
  folderId?: string
  contentType?: ContentType
}

export const updateNote = createAsyncAction<UpdateNoteParams, void>(
  'UpdateNote',
  async (params, { noteRepository }, state) => {
    if (state.session.currentUser) {
      await noteRepository.updateNote(state.session.currentUser, params.note, {
        content: params.content,
        folderId: params.folderId,
        contentType: params.contentType,
      })
    }
  }
)

type MoveFolderToTrashParams = {
  folder: Folder
}

export const moveFolderToTrash = createAsyncAction<MoveFolderToTrashParams, void>(
  'moveFolderToTrash',
  async (params, { noteRepository }, state, dispatch) => {
    const folder = params.folder
    if (state.session.currentUser) {
      await noteRepository.updateDeletedAtFolder(state.session.currentUser, folder)
      dispatch(systemSlice.actions.message({ message: 'Moved folder to trash' }))
    }
  }
)

type MoveNoteToTrashParams = {
  note: Note
}

export const moveNoteToTrash = createAsyncAction<MoveNoteToTrashParams, void>(
  'MoveNoteToTrash',
  async (params, { noteRepository }, state, dispatch) => {
    if (state.session.currentUser) {
      await noteRepository.updateDeletedAtNote(state.session.currentUser, params.note)
      dispatch(systemSlice.actions.message({ message: 'Moved note to trash' }))
    }
  }
)

type FavoriteParams = {
  folder?: Folder
  note?: Note
}

export const favorite = createAsyncAction<FavoriteParams, void>(
  'FavoriteFolder',
  async (params, { noteRepository }, state, dispatch) => {
    if (state.session.currentUser) {
      if (params.folder) {
        await noteRepository.updateFolder(state.session.currentUser, params.folder, { favorite: true })
        dispatch(systemSlice.actions.message({ message: `${params.folder.name} is now a favorite!` }))
      }
      if (params.note) {
        await noteRepository.updateNote(state.session.currentUser, params.note, { favorite: true })
        dispatch(systemSlice.actions.message({ message: `Note is now a favorite!` }))
      }
    }
  }
)

type UnFavoriteParams = {
  folder?: Folder
  note?: Note
}

export const unFavorite = createAsyncAction<UnFavoriteParams, void>(
  'UnFavorite',
  async (params, { noteRepository }, state, dispatch) => {
    if (state.session.currentUser) {
      if (params.folder) {
        await noteRepository.updateFolder(state.session.currentUser, params.folder, { favorite: false })
        dispatch(systemSlice.actions.message({ message: `Removed folder from my favorites.` }))
      }
      if (params.note) {
        await noteRepository.updateNote(state.session.currentUser, params.note, { favorite: false })
        dispatch(systemSlice.actions.message({ message: `Removed note from my favorites.` }))
      }
    }
  }
)

type RestoreParams = {
  folder?: Folder
  note?: Note
}

export const restore = createAsyncAction<RestoreParams, void>(
  'restore',
  async (params, { noteRepository }, state, dispatch) => {
    if (state.session.currentUser) {
      if (params.folder) {
        await noteRepository.resetDeletedAtFolder(state.session.currentUser, params.folder)
        dispatch(systemSlice.actions.message({ message: `${params.folder.name} has been restored` }))
      }
      if (params.note) {
        const { title } = useNote(params.note)
        await noteRepository.resetDeletedAtNote(state.session.currentUser, params.note)
        dispatch(systemSlice.actions.message({ message: `${title()} has been restored` }))
      }
    }
  }
)

type DeleteFolderParams = {
  folder: Folder
}

export const deleteFolder = createAsyncAction<DeleteFolderParams, void>(
  'deleteFolder',
  async (params, { noteRepository }, state, dispatch) => {
    const folder = params.folder
    if (state.session.currentUser) {
      await noteRepository.deleteFolder(state.session.currentUser, folder)
      dispatch(systemSlice.actions.message({ message: 'Deleted folder' }))
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
      dispatch(systemSlice.actions.message({ message: 'Deleted note' }))
    }
  }
)
