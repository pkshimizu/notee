import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Ace } from 'ace-builds'
import Editor = Ace.Editor
import EditSession = Ace.EditSession

type EditorProviderProps = {
  children: ReactNode
}

type EditorState = {
  id: string
  session: EditSession
}

type EditorContextParams = {
  editorStates: EditorState[]
  setEditorStates: Dispatch<SetStateAction<EditorState[]>>
  editor?: Editor
  setEditor: Dispatch<SetStateAction<Editor | undefined>>
}

export const EditorContext = createContext<EditorContextParams | undefined>(undefined)

export default function EditorProvider({ children }: EditorProviderProps) {
  const [editorStates, setEditorStates] = useState<EditorState[]>([])
  const [editor, setEditor] = useState<Editor | undefined>(undefined)

  return (
    <EditorContext.Provider value={{ editorStates, setEditorStates, editor, setEditor }}>
      {children}
    </EditorContext.Provider>
  )
}
