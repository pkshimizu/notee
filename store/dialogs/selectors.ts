import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'

const dialogsSelector = (state: StoreState) => state.dialogs
export const dialogsFolderCreateSelector = createSelector([dialogsSelector], (state) => state.folderCreate)
export const dialogsFolderDeleteSelector = createSelector([dialogsSelector], (state) => state.folderDelete)
export const dialogsFolderMoveSelector = createSelector([dialogsSelector], (state) => state.folderMove)
export const dialogsNoteDeleteSelector = createSelector([dialogsSelector], (state) => state.noteDelete)
export const dialogsNoteMoveSelector = createSelector([dialogsSelector], (state) => state.noteMove)
export const dialogsNoteLogSelector = createSelector([dialogsSelector], (state) => state.noteLog)
