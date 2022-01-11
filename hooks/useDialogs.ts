import { useCallback, useState } from 'react'
import { Folder, Note, NoteLog } from '../store/notes'
import { useDispatch, useSelector } from 'react-redux'
import dialogsSlice, {
  dialogsFolderDeleteSelector,
  dialogsNoteDeleteSelector,
  dialogsFolderCreateSelector,
  dialogsNoteLogSelector,
  dialogsFolderMoveSelector,
} from '../store/dialogs'

export function useFolderCreateDialog() {
  const folder = useSelector(dialogsFolderCreateSelector)
  const dispatch = useDispatch()
  const open = useCallback(
    (folder: Folder) => {
      dispatch(dialogsSlice.actions.openFolderCreateDialog({ folder: folder }))
    },
    [dispatch]
  )
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeFolderCreateDialog())
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

export const useFolderMoveDialog = () => {
  const folder = useSelector(dialogsFolderMoveSelector)
  const dispatch = useDispatch()
  const open = useCallback(
    (folder: Folder) => {
      dispatch(dialogsSlice.actions.openFolderMoveDialog({ folder: folder }))
    },
    [dispatch]
  )
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeFolderMoveDialog())
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
