import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchNotes, fetchRoot } from './actions'
import { Folder, Note } from './models'

export type NotesState = {
  folders: { [key: string]: Folder }
  notes: { [key: string]: Note }
  searchResults?: { notes: string[] }
}

export const notesInitialState: NotesState = {
  folders: {},
  notes: {},
  searchResults: undefined,
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
type SearchNotesParams = {
  keyword: string
}

const notesSlice = createSlice({
  name: 'notes',
  initialState: notesInitialState,
  reducers: {
    addFolder: (state, action: PayloadAction<AddFolderParams>) => {
      const folder = action.payload.folder
      const folders = { ...state.folders }
      folders[folder.id] = folder
      return {
        ...state,
        folders: folders,
      }
    },
    modifyFolder: (state, action: PayloadAction<ModifyFolderParams>) => {
      const folder = action.payload.folder
      const folders = { ...state.folders }
      folders[folder.id] = folder
      return {
        ...state,
        folders: folders,
      }
    },
    removeFolder: (state, action: PayloadAction<RemoveFolderParams>) => {
      const folder = action.payload.folder
      const folders = { ...state.folders }
      delete folders[folder.id]
      return {
        ...state,
        folders: folders,
      }
    },
    addNote: (state, action: PayloadAction<AddNoteParams>) => {
      const note = action.payload.note
      const notes = { ...state.notes }
      notes[note.id] = note
      return {
        ...state,
        notes: notes,
      }
    },
    modifyNote: (state, action: PayloadAction<ModifyNoteParams>) => {
      const note = action.payload.note
      const notes = { ...state.notes }
      notes[note.id] = note
      return {
        ...state,
        notes: notes,
      }
    },
    removeNote: (state, action: PayloadAction<RemoveNoteParams>) => {
      const note = action.payload.note
      const notes = { ...state.notes }
      delete notes[note.id]
      return {
        ...state,
        notes: notes,
      }
    },
    searchNotes: (state, action: PayloadAction<SearchNotesParams>) => {
      return {
        ...state,
        searchResults: {
          notes: Object.values(state.notes)
            .filter((note) => note.content.includes(action.payload.keyword))
            .map((note) => note.id),
        },
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoot.fulfilled, (state, action) => ({
      ...state,
      folders: action.payload.folders,
      notes: action.payload.notes,
    }))
    builder.addCase(fetchNotes.fulfilled, (state, action) => ({
      ...state,
      notes: action.payload.notes,
    }))
  },
})

export default notesSlice
