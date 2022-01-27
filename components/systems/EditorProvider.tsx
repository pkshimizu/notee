import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Ace } from 'ace-builds'
import UndoManager = Ace.UndoManager
import Editor = Ace.Editor

type EditorProviderProps = {
  children: ReactNode
}

type EditorState = {
  id: string
  editor: Editor
  undoManager: UndoManager
}

type EditorContextParams = {
  editors: EditorState[]
  setEditors: Dispatch<SetStateAction<EditorState[]>>
}

export const EditorContext = createContext<EditorContextParams | undefined>(undefined)

export default function EditorProvider({ children }: EditorProviderProps) {
  const [editors, setEditors] = useState<EditorState[]>([])

  return <EditorContext.Provider value={{ editors, setEditors }}>{children}</EditorContext.Provider>
}
