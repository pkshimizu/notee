import { createSelector, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { StoreState } from './index'

export type Note = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export type Folder = {
  id: string
  name: string
  folders: Folder[]
  notes: Note[]
}

function makeTitle(content: string): string {
  if (content.length > 0) {
    return content.split('\n')[0]
  }
  return '名前無し'
}

export type NotesState = {
  root: Folder
}

export const notesInitialState: NotesState = {
  root: {
    id: 'root',
    name: 'すべてのノート',
    folders: [
      {
        id: 'folder-1',
        name: 'aaaaaaaaaaaaaaaaaaaaaa',
        folders: [],
        notes: [],
      },
      {
        id: 'folder-2',
        name: 'あああああああああああああああ',
        folders: [],
        notes: [
          {
            id: 'note-1',
            title: makeTitle('AWSコマンド集（ECS編）'),
            content: 'AWSコマンド集（ECS編）',
            createdAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString(),
          },
          {
            id: 'note-2',
            title: makeTitle(''),
            content: '',
            createdAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString(),
          },
        ],
      },
    ],
    notes: [],
  },
}
// actions

// selectors
const noteSelector = (state: StoreState) => state.notes
export const rootFolderSelector = createSelector([noteSelector], (state) => state.root)
const pickupFolders = (folder: Folder): Folder[] => {
  return folder.folders.flatMap(folder => pickupFolders(folder)).concat(folder)
}
const pickupNotes = (folder: Folder): Note[] => {
  return folder.folders.flatMap(folder => pickupNotes(folder)).concat(folder.notes)
}
export const foldersSelector = createSelector([noteSelector], (state) => pickupFolders(state.root))
export const notesSelector = createSelector([noteSelector], (state) => pickupNotes(state.root))

// slice
const notesSlice = createSlice({
  name: 'notes',
  initialState: notesInitialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default notesSlice
