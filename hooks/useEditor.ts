import { EditorContext } from '../components/systems/EditorProvider'
import { useCallback, useContext, useEffect } from 'react'
import { Ace } from 'ace-builds'
import Editor = Ace.Editor
import { Note } from '../store/notes/models'
import { useDispatch, useSelector } from 'react-redux'
import EditorsSelectors from '../store/editors/selectors'
import { FontSize } from '../components/atoms/inputs/TextEditor'
import editorsSlice from '../store/editors'

export function useEditor(note: Note) {
  const context = useContext(EditorContext)
  const dispatch = useDispatch()
  const fontSize = useSelector(EditorsSelectors.fontSize)
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
  return {
    getEditor,
    setEditor,
    undo,
    redo,
    canUndo,
    canRedo,
    setFontSize,
    fontSize,
  }
}
