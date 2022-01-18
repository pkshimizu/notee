import { Note } from '../../store/notes/models'
import NoteMenu from './NoteMenu'
import TextEditor from '../atoms/inputs/TextEditor'
import { useCallback, useState } from 'react'
import { Ace } from 'ace-builds'
import { useDispatch } from 'react-redux'
import NotePropertiesPanel from './NotePropertiesPanel'
import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import { updateNote } from '../../store/notes/actions'

type NoteTabPanelProps = {
  note: Note
}

export default function NoteTabPanel({ note }: NoteTabPanelProps) {
  const [editor, setEditor] = useState<Ace.Editor | undefined>(undefined)
  const [propertiesPanel, setPropertiesPanel] = useState(false)
  const dispatch = useDispatch()
  const handleLoad = useCallback((editor) => {
    setEditor(editor)
  }, [])
  const handleResize = useCallback(() => {
    if (editor) {
      editor.resize()
    }
  }, [editor])
  const handleChangeContent = useCallback(
    (content: string) => {
      dispatch(updateNote({ note, content }))
    },
    [dispatch, note]
  )

  return (
    <WorkspaceTabPanel
      value={note.id}
      menu={<NoteMenu note={note} onOpenProperties={() => setPropertiesPanel(!propertiesPanel)} />}
      propertiesPanel={propertiesPanel ? <NotePropertiesPanel note={note} /> : undefined}
      onResize={handleResize}
    >
      <TextEditor content={note.content} onLoad={handleLoad} onChangeContent={handleChangeContent} />
    </WorkspaceTabPanel>
  )
}
