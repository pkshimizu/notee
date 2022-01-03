import { useCallback, useState } from 'react'
import { Folder, Note } from '../store/notes'
import { useDispatch, useSelector } from 'react-redux'
import dialogsSlice, {
  dialogsDeleteFolderSelector,
  dialogsDeleteNoteSelector,
  dialogsSettingsFolderSelector,
} from '../store/dialogs'

export function useFolderSettingsDialog() {
  const folder = useSelector(dialogsSettingsFolderSelector)
  const dispatch = useDispatch()
  const open = useCallback(
    (folder: Folder) => {
      dispatch(dialogsSlice.actions.openFolderSettingsDialog({ folder: folder }))
    },
    [dispatch]
  )
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeFolderSettingsDialog())
  }, [])
  return {
    state: folder !== undefined,
    folder,
    open,
    close,
  }
}
export const useFolderDeleteDialog = () => {
  const folder = useSelector(dialogsDeleteFolderSelector)
  const dispatch = useDispatch()
  const open = useCallback(
    (folder: Folder) => {
      dispatch(dialogsSlice.actions.openFolderDeleteDialog({ folder: folder }))
    },
    [dispatch]
  )
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeFolderDeleteDialog())
  }, [])
  return {
    state: folder !== undefined,
    folder,
    open,
    close,
  }
}

export const useNoteDeleteDialog = () => {
  const note = useSelector(dialogsDeleteNoteSelector)
  const dispatch = useDispatch()
  const open = useCallback(
    (note: Note) => {
      dispatch(dialogsSlice.actions.openNoteDeleteDialog({ note: note }))
    },
    [dispatch]
  )
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeNoteDeleteDialog())
  }, [])
  return {
    state: note !== undefined,
    note,
    open,
    close,
  }
}
