import { useCallback, useState } from 'react'
import { Folder, Note, NoteLog } from '../store/notes/models'
import { useDispatch, useSelector } from 'react-redux'
import dialogsSlice from '../store/dialogs'
import DialogsSelectors from '../store/dialogs/selectors'

export function useFolderCreateDialog() {
  const folder = useSelector(DialogsSelectors.folderCreate)
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
export const useFolderMoveToTrashDialog = () => {
  const folder = useSelector(DialogsSelectors.folderMoveToTrash)
  const dispatch = useDispatch()
  const open = useCallback(
    (folder: Folder) => {
      dispatch(dialogsSlice.actions.openFolderMoveToTrashDialog({ folder: folder }))
    },
    [dispatch]
  )
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeFolderMoveToTrashDialog())
  }, [])
  return {
    state: folder !== undefined,
    folder,
    open,
    close,
  }
}

export const useFolderMoveDialog = () => {
  const folder = useSelector(DialogsSelectors.folderMove)
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

export const useNoteMoveToTrashDialog = () => {
  const note = useSelector(DialogsSelectors.noteMoveToTrash)
  const dispatch = useDispatch()
  const open = useCallback(
    (note: Note) => {
      dispatch(dialogsSlice.actions.openNoteMoveToTrashDialog({ note: note }))
    },
    [dispatch]
  )
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeNoteMoveToTrashDialog())
  }, [])
  return {
    state: note !== undefined,
    note,
    open,
    close,
  }
}

export const useNoteMoveDialog = () => {
  const note = useSelector(DialogsSelectors.noteMove)
  const dispatch = useDispatch()
  const open = useCallback(
    (note: Note) => {
      dispatch(dialogsSlice.actions.openNoteMoveDialog({ note: note }))
    },
    [dispatch]
  )
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeNoteMoveDialog())
  }, [])
  return {
    state: note !== undefined,
    note,
    open,
    close,
  }
}

export const useNoteLogDialog = () => {
  const dialog = useSelector(DialogsSelectors.noteLog)
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

export const useFolderDeleteDialog = () => {
  const folder = useSelector(DialogsSelectors.folderDelete)
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
  const note = useSelector(DialogsSelectors.noteDelete)
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

export const useTrashEmptyDialog = () => {
  const state = useSelector(DialogsSelectors.trashEmpty)
  const dispatch = useDispatch()
  const open = useCallback(() => {
    dispatch(dialogsSlice.actions.openTrashEmptyDialog())
  }, [dispatch])
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeTrashEmptyDialog())
  }, [])
  return {
    state,
    open,
    close,
  }
}
