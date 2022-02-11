import { EditorContext } from '../components/systems/EditorProvider'
import { useCallback, useContext } from 'react'
import { Ace } from 'ace-builds'
import Editor = Ace.Editor
import { Note } from '../store/notes/models'

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
  const resetEditor = useCallback(
    (note?: Note) => {
      if (context === undefined || !context.editor) {
        return undefined
      }
      if (!note) {
        const session = require('ace-builds').createEditSession('', `ace/mode/markdown`)
        context.editor.setSession(session)
        return
      }
      const editorState = context.editorStates.find((state) => state.id === note.id)
      if (editorState) {
        context.editor.setSession(editorState.session)
      } else {
        const session = require('ace-builds').createEditSession(note.content, `ace/mode/${note.contentType}`)
        context.editorStates.push({ id: note.id, session })
        context.editor.setSession(session)
      }
    },
    [context]
  )
  return {
    getEditor,
    setEditor,
    resetEditor,
  }
}
