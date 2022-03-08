import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'

const dialogsSelector = (state: StoreState) => state.dialogs

const DialogsSelectors = {
  folderCreate: createSelector([dialogsSelector], (state) => state.folderCreate),
  folderMoveToTrash: createSelector([dialogsSelector], (state) => state.folderMoveToTrash),
  folderMove: createSelector([dialogsSelector], (state) => state.folderMove),
  noteMoveToTrash: createSelector([dialogsSelector], (state) => state.noteMoveToTrash),
  noteMove: createSelector([dialogsSelector], (state) => state.noteMove),
  noteLog: createSelector([dialogsSelector], (state) => state.noteLog),
  folderDelete: createSelector([dialogsSelector], (state) => state.folderDelete),
  noteDelete: createSelector([dialogsSelector], (state) => state.noteDelete),
  trashEmpty: createSelector([dialogsSelector], (state) => state.trashEmpty),
  fileUpload: createSelector([dialogsSelector], (state) => state.fileUpload),
}

export default DialogsSelectors
