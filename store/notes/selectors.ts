import sortBy from 'lodash/sortBy'
import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'
import { Folder, Note } from '../notes/models'

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
export const rootFolderSelector = createSelector([noteSelector], (state) => {
  const folders = buildFolders(Object.values(state.folders), Object.values(state.notes))
  return folders.find((folder) => folder.folderId === undefined)
})
export const foldersSelector = createSelector([noteSelector], (state) => {
  return buildFolders(Object.values(state.folders), Object.values(state.notes))
})
export const notesSelector = createSelector([noteSelector], (state) => Object.values(state.notes))
export const searchResultsSelector = createSelector([noteSelector], (state) => state.searchResults)
export const searchResultNotesSelector = createSelector([noteSelector], (state) =>
  Object.values(state.notes).filter((note) => state.searchResults?.notes?.includes(note.id))
)
export const favoriteFoldersSelector = createSelector([noteSelector], (state) =>
  Object.values(state.folders).filter((folder) => folder.favorite)
)
export const favoriteNotesSelector = createSelector([noteSelector], (state) =>
  Object.values(state.notes).filter((note) => note.favorite)
)
