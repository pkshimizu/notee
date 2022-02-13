import { EditorContext } from '../components/systems/EditorProvider'
import { useCallback, useContext } from 'react'
import { Ace } from 'ace-builds'
import Editor = Ace.Editor

export function useEditor() {
  const context = useContext(EditorContext)
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
  return {
    getEditor,
    setEditor,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}
