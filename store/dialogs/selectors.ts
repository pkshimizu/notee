import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'

const dialogsSelector = (state: StoreState) => state.dialogs
export const dialogsFolderCreateSelector = createSelector([dialogsSelector], (state) => state.folderCreate)
export const dialogsFolderMoveToTrashSelector = createSelector([dialogsSelector], (state) => state.folderMoveToTrash)
export const dialogsFolderMoveSelector = createSelector([dialogsSelector], (state) => state.folderMove)
export const dialogsNoteMoveToTrashSelector = createSelector([dialogsSelector], (state) => state.noteMoveToTrash)
export const dialogsNoteMoveSelector = createSelector([dialogsSelector], (state) => state.noteMove)
export const dialogsNoteLogSelector = createSelector([dialogsSelector], (state) => state.noteLog)
