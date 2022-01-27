import { EditorContext } from '../components/systems/EditorProvider'
import { useCallback, useContext } from 'react'
import { Ace } from 'ace-builds'
import Editor = Ace.Editor

export function useEditor() {
  const context = useContext(EditorContext)
  const getEditor = useCallback(
    (id: string) => {
      if (context === undefined) {
        return undefined
      }
      const editorState = context.editors.find((editor) => editor.id === id)
      if (editorState) {
        editorState.editor.getSession().setUndoManager(editorState.undoManager)
      }
      return editorState?.editor
    },
    [context]
  )
  const setEditor = useCallback(
    (id: string, editor: Editor) => {
      if (context === undefined) {
        return
      }
      const undoManager = editor.getSession().getUndoManager()
      const editorState = context.editors.find((editor) => editor.id === id)
      if (editorState) {
        context.setEditors(
          context.editors.map((state) => {
            if (state.id === id) {
              return {
                ...state,
                editor: editor,
              }
            }
            return state
          })
        )
      } else {
        context.setEditors(
          context.editors.concat({
            id: id,
            editor: editor,
            undoManager: undoManager,
          })
        )
      }
    },
    [context]
  )
  return {
    getEditor,
    setEditor,
  }
}
