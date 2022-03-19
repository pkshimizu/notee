import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import NotesActions from './actions'
import { Folder, Note, FileMeta } from './models'

export type NotesState = {
  folders: { [key: string]: Folder }
  notes: { [key: string]: Note }
  files: FileMeta[]
  searchResults?: { notes: string[]; folders: string[] }
  usageFolderCapacity: number
  usageNoteCapacity: number
  usageFileCapacity: number
  usageStorageCapacity: number
}

export const notesInitialState: NotesState = {
  folders: {},
  notes: {},
  files: [],
  searchResults: undefined,
  usageFolderCapacity: 0,
  usageNoteCapacity: 0,
  usageFileCapacity: 0,
  usageStorageCapacity: 0,
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
type AddFileParams = {
  file: FileMeta
}
type ModifyFileParams = {
  file: FileMeta
}
type RemoveFileParams = {
  file: FileMeta
}

function calcSize(object: boolean | number | string | object): number {
  switch (typeof object) {
    case 'boolean':
      return 1
    case 'number':
      return 8
    case 'string':
      return object.length * 4
    case 'object':
      const sizeArray = Object.keys(object).map((key) => {
        const value = object as { [key: string]: boolean | number | string | object }
        return calcSize(value[key])
      })
      if (sizeArray.length === 0) {
        return 0
      }
      return sizeArray.reduce((previousValue, currentValue) => previousValue + currentValue)
    default:
      return 0
  }
}

const notesSlice = createSlice({
  name: 'notes',
  initialState: notesInitialState,
  reducers: {
    addFolder: (state, action: PayloadAction<AddFolderParams>) => {
      const folder = action.payload.folder
      state.folders[folder.id] = folder
      state.usageFolderCapacity = calcSize(state.folders)
    },
    modifyFolder: (state, action: PayloadAction<ModifyFolderParams>) => {
      const folder = action.payload.folder
      state.folders[folder.id] = folder
      state.usageFolderCapacity = calcSize(state.folders)
    },
    removeFolder: (state, action: PayloadAction<RemoveFolderParams>) => {
      const folder = action.payload.folder
      delete state.folders[folder.id]
      state.usageFolderCapacity = calcSize(state.folders)
    },
    addNote: (state, action: PayloadAction<AddNoteParams>) => {
      const note = action.payload.note
      state.notes[note.id] = note
      state.usageNoteCapacity = calcSize(state.notes)
    },
    modifyNote: (state, action: PayloadAction<ModifyNoteParams>) => {
      const note = action.payload.note
      state.notes[note.id] = note
      state.usageNoteCapacity = calcSize(state.notes)
    },
    removeNote: (state, action: PayloadAction<RemoveNoteParams>) => {
      const note = action.payload.note
      delete state.notes[note.id]
      state.usageNoteCapacity = calcSize(state.notes)
    },
    addFile: (state, action: PayloadAction<AddFileParams>) => {
      state.files.push(action.payload.file)
      state.usageFileCapacity = calcSize(state.files)
      state.usageStorageCapacity = state.files.map((file) => file.bytes).reduce((prev, current) => prev + current)
    },
    modifyFile: (state, action: PayloadAction<ModifyFileParams>) => {
      const file = action.payload.file
      state.files = state.files.map((item) => {
        if (item.id === file.id) {
          return file
        }
        return item
      })
      state.usageFileCapacity = calcSize(state.files)
      state.usageStorageCapacity = state.files.map((file) => file.bytes).reduce((prev, current) => prev + current)
    },
    removeFile: (state, action: PayloadAction<RemoveFileParams>) => {
      const file = action.payload.file
      state.files = state.files.filter((item) => item.id !== file.id)
      state.usageFileCapacity = calcSize(state.files)
      state.usageStorageCapacity = state.files.map((file) => file.bytes).reduce((prev, current) => prev + current)
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
    builder
      .addCase(NotesActions.fetchRoot.fulfilled, (state, action) => {
        state.folders = action.payload.folders
        state.notes = action.payload.notes
        state.usageFolderCapacity = calcSize(action.payload.folders)
        state.usageNoteCapacity = calcSize(action.payload.notes)
      })
      .addCase(NotesActions.fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload.notes
        state.usageNoteCapacity = calcSize(action.payload.notes)
      })
  },
})

export default notesSlice
