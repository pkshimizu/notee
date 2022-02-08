import sortBy from 'lodash/sortBy'
import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'
import { Folder, Note } from './models'

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

export const foldersSelector = createSelector([folderListSelector, noteListSelector], (folders, notes) => {
  return buildFolders(folders, notes)
})
export const rootFolderSelector = createSelector([foldersSelector], (folders) => {
  return folders.find((folder) => folder.folderId === undefined)
})
export const notesSelector = createSelector([noteListSelector], (notes) => notes)
export const searchResultNotesSelector = createSelector(
  [noteListSelector, searchResultsSelector],
  (notes, searchResults) => notes.filter((note) => searchResults?.notes?.includes(note.id))
)
export const searchResultFoldersSelector = createSelector(
  [folderListSelector, searchResultsSelector],
  (folders, searchResults) => folders.filter((folder) => searchResults?.folders?.includes(folder.id))
)
export const favoriteFoldersSelector = createSelector([folderListSelector], (folders) =>
  folders.filter((folder) => folder.favorite)
)
export const favoriteNotesSelector = createSelector([noteListSelector], (notes) =>
  notes.filter((note) => note.favorite)
)
const deletedFoldersSelector = createSelector([noteSelector], (state) =>
  Object.values(state.folders).filter((folder) => folder.deletedAt !== undefined)
)
const deletedNotesSelector = createSelector([noteSelector], (state) =>
  Object.values(state.notes).filter((note) => note.deletedAt !== undefined)
)
export const trashFoldersSelector = createSelector([deletedFoldersSelector, deletedNotesSelector], (folders, notes) => {
  const folderIds = folders.map((folder) => folder.id)
  return buildFolders(folders, notes).filter((folder) => !folderIds.includes(folder.folderId ?? ''))
})
export const trashNotesSelector = createSelector([deletedFoldersSelector, deletedNotesSelector], (folders, notes) => {
  const folderIds = folders.map((folder) => folder.id)
  return notes.filter((note) => !folderIds.includes(note.folderId))
})
