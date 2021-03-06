import { EditorContext } from '../components/systems/EditorProvider'
import { useCallback, useContext, useEffect } from 'react'
import { Ace } from 'ace-builds'
import Editor = Ace.Editor
import { Note } from '../store/notes/models'
import { useDispatch, useSelector } from 'react-redux'
import EditorsSelectors from '../store/editors/selectors'
import { FontSize } from '../components/atoms/inputs/TextEditor'
import editorsSlice, { PreviewSize } from '../store/editors'

function previewSizeToEditorRight(size?: PreviewSize) {
  switch (size) {
    case 'full':
      return '100%'
    case 'half':
      return '50%'
    default:
      return 0
  }
}

function previewSizeToPreviewLeft(size?: PreviewSize) {
  switch (size) {
    case 'full':
      return '0'
    case 'half':
      return '50%'
    default:
      return '100%'
  }
}

export function useEditor(note: Note) {
  const context = useContext(EditorContext)
  const dispatch = useDispatch()
  const fontSize = useSelector(EditorsSelectors.fontSize)
  const preview = useSelector(EditorsSelectors.preview)
  const cursor = useSelector(EditorsSelectors.cursor)
  const syncScroll = useSelector(EditorsSelectors.syncScroll)

  useEffect(() => {
    dispatch(editorsSlice.actions.select({ id: note.id }))
  }, [dispatch, note])

  const getEditor = useCallback(
    (id: string) => {
      return context?.getEditor(id)
    },
    [context]
  )
  const setEditor = useCallback(
    (id: string, editor: Editor) => {
      context?.setEditor(id, editor)
    },
    [context]
  )

  const handleChangeCursor = useCallback(() => {
    const editor = getEditor(note.id)
    const cursor = editor?.getCursorPosition()
    if (cursor) {
      dispatch(
        editorsSlice.actions.updateCursor({
          id: note.id,
          cursor: {
            row: cursor.row + 1,
            column: cursor.column + 1,
          },
        })
      )
    }
  }, [getEditor, note, dispatch])

  useEffect(() => {
    const editor = getEditor(note.id)
    if (syncScroll) {
      editor?.getSession().getSelection().on('changeCursor', handleChangeCursor)
    } else {
      editor?.getSession().getSelection().off('changeCursor', handleChangeCursor)
    }

    return () => {
      editor?.getSession().getSelection().off('changeCursor', handleChangeCursor)
    }
  }, [getEditor, note, syncScroll, handleChangeCursor])

  const undo = useCallback(
    (id: string) => {
      context?.getEditor(id)?.undo()
    },
    [context]
  )
  const redo = useCallback(
    (id: string) => {
      context?.getEditor(id)?.redo()
    },
    [context]
  )
  const canUndo = useCallback(
    (id: string) => {
      const editor = context?.getEditor(id)
      return editor?.getSession().getUndoManager().canUndo()
    },
    [context]
  )
  const canRedo = useCallback(
    (id: string) => {
      const editor = context?.getEditor(id)
      return editor?.getSession().getUndoManager().canRedo()
    },
    [context]
  )
  const setFontSize = useCallback(
    (size: FontSize) => {
      dispatch(editorsSlice.actions.updateFontSize({ id: note.id, size }))
    },
    [dispatch, note]
  )
  const setPreview = useCallback(
    (size: PreviewSize) => {
      if (size === preview) {
        dispatch(editorsSlice.actions.updatePreview({ id: note.id, size: 'none' }))
      } else {
        dispatch(editorsSlice.actions.updatePreview({ id: note.id, size }))
      }
    },
    [dispatch, note, preview]
  )
  const setSyncScroll = useCallback(
    (sync: boolean) => {
      dispatch(editorsSlice.actions.updateSyncScroll({ id: note.id, sync }))
    },
    [dispatch, note]
  )

  return {
    getEditor,
    setEditor,
    undo,
    redo,
    canUndo,
    canRedo,
    setFontSize,
    fontSize,
    setPreview,
    editorRight: previewSizeToEditorRight(preview),
    previewLeft: previewSizeToPreviewLeft(preview),
    cursor,
    setSyncScroll,
    syncScroll,
  }
}
