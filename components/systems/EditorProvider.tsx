import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Ace } from 'ace-builds'
import Editor = Ace.Editor

type EditorProviderProps = {
  children: ReactNode
}

type EditorContextParams = {
  editor?: Editor
  setEditor: Dispatch<SetStateAction<Editor | undefined>>
}

export const EditorContext = createContext<EditorContextParams | undefined>(undefined)

export default function EditorProvider({ children }: EditorProviderProps) {
  const [editor, setEditor] = useState<Editor | undefined>(undefined)

  return <EditorContext.Provider value={{ editor, setEditor }}>{children}</EditorContext.Provider>
}
