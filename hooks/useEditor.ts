import { EditorContext } from '../components/systems/EditorProvider'
import { useCallback, useContext } from 'react'
import { Ace } from 'ace-builds'
import Editor = Ace.Editor

export function useEditor() {
  const context = useContext(EditorContext)
  const getEditor = useCallback(() => {
    return context?.editor
  }, [context])
  const setEditor = useCallback(
    (editor: Editor) => {
      context?.setEditor(editor)
    },
    [context]
  )
  return {
    getEditor,
    setEditor,
  }
}
