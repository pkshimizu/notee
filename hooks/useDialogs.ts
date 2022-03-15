import { useCallback } from 'react'
import { File, Folder, Note, NoteLog } from '../store/notes/models'
import { useDispatch, useSelector } from 'react-redux'
import dialogsSlice from '../store/dialogs'
import DialogsSelectors from '../store/dialogs/selectors'

export function useFolderCreateDialog() {
  const state = useSelector(DialogsSelectors.folderCreate)
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
    state,
    open,
    close,
  }
}
export const useFolderMoveToTrashDialog = () => {
  const state = useSelector(DialogsSelectors.folderMoveToTrash)
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
    state,
    open,
    close,
  }
}

export const useFolderMoveDialog = () => {
  const state = useSelector(DialogsSelectors.folderMove)
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
    state,
    open,
    close,
  }
}

export const useNoteMoveToTrashDialog = () => {
  const state = useSelector(DialogsSelectors.noteMoveToTrash)
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
    state,
    open,
    close,
  }
}

export const useNoteMoveDialog = () => {
  const state = useSelector(DialogsSelectors.noteMove)
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
    state,
    open,
    close,
  }
}

export const useNoteLogDialog = () => {
  const state = useSelector(DialogsSelectors.noteLog)
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
    state,
    open,
    close,
  }
}

export const useFolderDeleteDialog = () => {
  const state = useSelector(DialogsSelectors.folderDelete)
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
    state,
    open,
    close,
  }
}

export const useNoteDeleteDialog = () => {
  const state = useSelector(DialogsSelectors.noteDelete)
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
    state,
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

export const useFileUploadDialog = () => {
  const state = useSelector(DialogsSelectors.fileUpload)
  const dispatch = useDispatch()
  const open = useCallback(
    (folder: Folder) => {
      dispatch(dialogsSlice.actions.openFileUploadDialog({ folder }))
    },
    [dispatch]
  )
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeFileUploadDialog())
  }, [])
  return {
    state,
    open,
    close,
  }
}

export const useFileMoveDialog = () => {
  const state = useSelector(DialogsSelectors.fileMove)
  const dispatch = useDispatch()
  const open = useCallback(
    (file: File) => {
      dispatch(dialogsSlice.actions.openFileMoveDialog({ file }))
    },
    [dispatch]
  )
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeFileMoveDialog())
  }, [])
  return {
    state,
    open,
    close,
  }
}

export const useFileMoveToTrashDialog = () => {
  const state = useSelector(DialogsSelectors.fileMoveToTrash)
  const dispatch = useDispatch()
  const open = useCallback(
    (file: File) => {
      dispatch(dialogsSlice.actions.openFileMoveToTrashDialog({ file }))
    },
    [dispatch]
  )
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeFileMoveToTrashDialog())
  }, [])
  return {
    state,
    open,
    close,
  }
}

export const useFileDeleteDialog = () => {
  const state = useSelector(DialogsSelectors.fileDelete)
  const dispatch = useDispatch()
  const open = useCallback(
    (file: File) => {
      dispatch(dialogsSlice.actions.openFileDeleteDialog({ file }))
    },
    [dispatch]
  )
  const close = useCallback(() => {
    dispatch(dialogsSlice.actions.closeFileDeleteDialog())
  }, [])
  return {
    state,
    open,
    close,
  }
}
