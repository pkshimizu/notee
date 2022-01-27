import { Note } from '../../store/notes/models'
import NoteMenu from './NoteMenu'
import TextEditor, { FontSize } from '../atoms/inputs/TextEditor'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NotePropertiesPanel from './NotePropertiesPanel'
import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import { updateNote } from '../../store/notes/actions'
import { editorSettingsSelector } from '../../store/session/selectors'
import { useEditor } from '../../hooks/useEditor'

type NoteTabPanelProps = {
  note: Note
}

export default function NoteTabPanel({ note }: NoteTabPanelProps) {
  const { getEditor, setEditor } = useEditor()
  const [propertiesPanel, setPropertiesPanel] = useState(false)
  const editorSettings = useSelector(editorSettingsSelector)
  const [fontSize, setFontSize] = useState<FontSize>(14)
  const dispatch = useDispatch()
  const handleLoad = useCallback(
    (editor) => {
      setEditor(note.id, editor)
    },
    [note, setEditor]
  )
  const handleResize = useCallback(() => {
    const editor = getEditor(note.id)
    if (editor) {
      editor.resize()
    }
  }, [note, getEditor])
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
