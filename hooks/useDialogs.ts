import { useCallback, useState } from 'react'
import { Folder, Note, NoteLog } from '../store/notes'
import { useDispatch, useSelector } from 'react-redux'
import dialogsSlice, {
  dialogsFolderDeleteSelector,
  dialogsNoteDeleteSelector,
  dialogsFolderSettingsSelector,
  dialogsNoteLogSelector,
} from '../store/dialogs'

export function useFolderSettingsDialog() {
  const folder = useSelector(dialogsFolderSettingsSelector)
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
  const folder = useSelector(dialogsFolderDeleteSelector)
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
  const note = useSelector(dialogsNoteDeleteSelector)
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

export const useNoteLogDialog = () => {
  const dialog = useSelector(dialogsNoteLogSelector)
  const dispatch = useDispatch()
  const open = useCallback(
    (note: Note, log: NoteLog) => {
      dispatch(dialogsSlice.actions.openNoteLogDialog({ note: note, log: log }))
    },
    [dispatch]
  )
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeNoteLogDialog())
  }, [])
  return {
    state: dialog !== undefined,
    note: dialog?.note,
    log: dialog?.log,
    open,
    close,
  }
}