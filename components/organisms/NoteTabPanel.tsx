import { Note } from '../../store/notes/models'
import NoteMenu from './NoteMenu'
import TextEditor, { FontSize } from '../atoms/inputs/TextEditor'
import { useCallback, useState } from 'react'
import { Ace } from 'ace-builds'
import { useDispatch, useSelector } from 'react-redux'
import NotePropertiesPanel from './NotePropertiesPanel'
import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import { updateNote } from '../../store/notes/actions'
import { editorSettingsSelector } from '../../store/session/selectors'

type NoteTabPanelProps = {
  note: Note
}

export default function NoteTabPanel({ note }: NoteTabPanelProps) {
  const [editor, setEditor] = useState<Ace.Editor | undefined>(undefined)
  const [propertiesPanel, setPropertiesPanel] = useState(false)
  const editorSettings = useSelector(editorSettingsSelector)
  const [fontSize, setFontSize] = useState<FontSize>(14)
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
      menu={<NoteMenu note={note} onOpenProperties={() => setPropertiesPanel(!propertiesPanel)} />}
      propertiesPanel={
        propertiesPanel ? (
          <NotePropertiesPanel note={note} fontSize={fontSize} onChangeFontSize={(value) => setFontSize(value)} />
        ) : undefined
      }
      onResize={handleResize}
    >
      <TextEditor
        content={note.content}
        keyBinding={editorSettings.keyBinding}
        theme={editorSettings.theme}
        mode={note.contentType}
        fontSize={fontSize}
        onLoad={handleLoad}
        onChangeContent={handleChangeContent}
      />
    </WorkspaceTabPanel>
  )
}
