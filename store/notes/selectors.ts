import sortBy from 'lodash/sortBy'
import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'
import { Folder, Note } from './models'
import dayjs from 'dayjs'

function sortFolders(folders: Folder[]): Folder[] {
  return sortBy(folders, 'name')
}

function sortNotes(notes: Note[]): Note[] {
  return sortBy(notes, 'createdAt').reverse()
}

function buildFolders(folders: Folder[], notes: Note[]) {
  const itemsInFolders: Folder[] = folders.map((folder) => ({ ...folder, folders: [], notes: [] }))
  itemsInFolders.forEach((folder) => {
    folder.folders = sortFolders(itemsInFolders.filter((subFolder) => subFolder.folderId === folder.id))
    folder.notes = sortNotes(notes.filter((note) => note.folderId === folder.id))
  })
  return itemsInFolders
}

const noteSelector = (state: StoreState) => state.notes
const folderListSelector = createSelector([noteSelector], (state) =>
  Object.values(state.folders).filter((folder) => folder.deletedAt === undefined)
)
const noteListSelector = createSelector([noteSelector], (state) =>
  Object.values(state.notes).filter((note) => note.deletedAt === undefined)
)
const searchResultsSelector = createSelector([noteSelector], (state) => state.searchResults)

const deletedFoldersSelector = createSelector([noteSelector], (state) =>
  Object.values(state.folders).filter((folder) => folder.deletedAt !== undefined)
)
const deletedNotesSelector = createSelector([noteSelector], (state) =>
  Object.values(state.notes).filter((note) => note.deletedAt !== undefined)
)
const recentNotesSelector = createSelector([noteSelector], (state) =>
  Object.values(state.notes).filter((note) => dayjs(note.updatedAt).isAfter(dayjs().subtract(7, 'day')))
)
const foldersSelector = createSelector([folderListSelector, noteListSelector], (folders, notes) => {
  return buildFolders(folders, notes)
})

const NotesSelectors = {
  folders: createSelector([foldersSelector], (folders) => {
    return folders
  }),
  rootFolder: createSelector([foldersSelector], (folders) => {
    return folders.find((folder) => folder.folderId === undefined)
  }),
  notes: createSelector([noteListSelector], (notes) => notes),
  searchResultNotes: createSelector([noteListSelector, searchResultsSelector], (notes, searchResults) =>
    notes.filter((note) => searchResults?.notes?.includes(note.id))
  ),
  searchResultFolders: createSelector([folderListSelector, searchResultsSelector], (folders, searchResults) =>
    folders.filter((folder) => searchResults?.folders?.includes(folder.id))
  ),
  favoriteFolders: createSelector([folderListSelector], (folders) => folders.filter((folder) => folder.favorite)),
  favoriteNotes: createSelector([noteListSelector], (notes) => notes.filter((note) => note.favorite)),
  trashFolders: createSelector([deletedFoldersSelector, deletedNotesSelector], (folders, notes) => {
    const folderIds = folders.map((folder) => folder.id)
    return buildFolders(folders, notes).filter((folder) => !folderIds.includes(folder.folderId ?? ''))
  }),
  trashNotes: createSelector([deletedFoldersSelector, deletedNotesSelector], (folders, notes) => {
    const folderIds = folders.map((folder) => folder.id)
    return notes.filter((note) => !folderIds.includes(note.folderId))
  }),
  recentNotes: createSelector([recentNotesSelector], (notes) => {
    return notes
  }),
}

export default NotesSelectors
