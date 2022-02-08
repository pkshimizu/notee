import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchNotes, fetchRoot } from './actions'
import { Folder, Note } from './models'

export type NotesState = {
  folders: { [key: string]: Folder }
  notes: { [key: string]: Note }
  searchResults?: { notes: string[]; folders: string[] }
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
      state.folders[folder.id] = folder
    },
    modifyFolder: (state, action: PayloadAction<ModifyFolderParams>) => {
      const folder = action.payload.folder
      state.folders[folder.id] = folder
    },
    removeFolder: (state, action: PayloadAction<RemoveFolderParams>) => {
      const folder = action.payload.folder
      delete state.folders[folder.id]
    },
    addNote: (state, action: PayloadAction<AddNoteParams>) => {
      const note = action.payload.note
      state.notes[note.id] = note
    },
    modifyNote: (state, action: PayloadAction<ModifyNoteParams>) => {
      const note = action.payload.note
      state.notes[note.id] = note
    },
    removeNote: (state, action: PayloadAction<RemoveNoteParams>) => {
      const note = action.payload.note
      delete state.notes[note.id]
    },
    searchNotes: (state, action: PayloadAction<SearchNotesParams>) => {
      state.searchResults = {
        notes: Object.values(state.notes)
          .filter((note) => note.content.includes(action.payload.keyword))
          .map((note) => note.id),
        folders: Object.values(state.folders)
          .filter((folder) => folder.name.includes(action.payload.keyword))
          .map((folder) => folder.id),
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoot.fulfilled, (state, action) => {
      state.folders = action.payload.folders
      state.notes = action.payload.notes
    })
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes = action.payload.notes
    })
  },
})

export default notesSlice
