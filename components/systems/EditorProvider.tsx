import { createContext, ReactNode, useCallback, useState } from 'react'
import { Ace } from 'ace-builds'
import Editor = Ace.Editor

type EditorProviderProps = {
  children: ReactNode
}

type EditorState = {
  id: string
  editor: Editor
}

type EditorContextParams = {
  setEditor: (_id: string, _editor: Editor) => void
  getEditor: (_id: string) => Editor | undefined
}

export const EditorContext = createContext<EditorContextParams | undefined>(undefined)

export default function EditorProvider({ children }: EditorProviderProps) {
  const [states, setStates] = useState<EditorState[]>([])
  const setEditor = useCallback(
    (id: string, editor: Editor) => {
      if (states.find((state) => state.id === id)) {
        setStates(
          states.map((state) => {
            if (state.id === id) {
              return { id, editor }
            }

            return state
          })
        )
      } else {
        setStates(states.concat({ id, editor }))
      }
    },
    [states, setStates]
  )
  const getEditor = useCallback(
    (id: string) => {
      return states.find((state) => state.id === id)?.editor
    },
    [states]
  )

  return <EditorContext.Provider value={{ getEditor, setEditor }}>{children}</EditorContext.Provider>
}
