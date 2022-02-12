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
import { FlexRow } from '../atoms/layout/Flex'

type NoteTabPanelProps = {
  notes: Note[]
  activeNote: Note
}

export default function NoteTabPanel({ notes, activeNote }: NoteTabPanelProps) {
  const { getEditor, setEditor } = useEditor()
  const [propertiesPanel, setPropertiesPanel] = useState(false)
  const editorSettings = useSelector(editorSettingsSelector)
  const [fontSize, setFontSize] = useState<FontSize>(14)
  const dispatch = useDispatch()
  const handleLoad = useCallback(
    (editor) => {
      editor.resize()
      setEditor(editor)
    },
    [setEditor]
  )
  const handleResize = useCallback(() => {
    const editor = getEditor()
    editor?.resize()
  }, [getEditor])
  const handleChangeContent = useCallback(
    (content: string) => {
      dispatch(updateNote({ note: activeNote, content }))
    },
    [dispatch, activeNote]
  )

  return (
    <WorkspaceTabPanel
      menu={<NoteMenu note={activeNote} onOpenProperties={() => setPropertiesPanel(!propertiesPanel)} />}
      propertiesPanel={
        propertiesPanel ? (
          <NotePropertiesPanel note={activeNote} fontSize={fontSize} onChangeFontSize={(value) => setFontSize(value)} />
        ) : undefined
      }
      onResize={handleResize}
      onClosePropertiesPanel={() => setPropertiesPanel(false)}
    >
      {notes.map((note) => (
        <FlexRow key={note.id} height={note.id === activeNote.id ? '100%' : 0}>
          <TextEditor
            content={note.content}
            keyBinding={editorSettings.keyBinding}
            theme={editorSettings.theme}
            mode={note.contentType}
            fontSize={fontSize}
            onLoad={handleLoad}
            onChangeContent={handleChangeContent}
          />
        </FlexRow>
      ))}
    </WorkspaceTabPanel>
  )
}
