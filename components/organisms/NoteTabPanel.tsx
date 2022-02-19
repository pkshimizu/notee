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
import MarkdownViewer from '../atoms/display/MarkdownViewer'
import RelativeBox from '../atoms/layout/RelativeBox'
import AbsoluteBox from '../atoms/layout/AbsoluteBox'

type NoteTabPanelProps = {
  notes: Note[]
  activeNote: Note
}

export default function NoteTabPanel({ notes, activeNote }: NoteTabPanelProps) {
  const { getEditor, setEditor } = useEditor()
  const [propertiesPanel, setPropertiesPanel] = useState(false)
  const [preview, setPreview] = useState(false)
  const editorSettings = useSelector(editorSettingsSelector)
  const [fontSize, setFontSize] = useState<FontSize>(14)
  const dispatch = useDispatch()
  const handleLoad = useCallback(
    (id, editor) => {
      editor.resize()
      setEditor(id, editor)
    },
    [setEditor]
  )
  const handleResize = useCallback(() => {
    const editor = getEditor(activeNote.id)
    editor?.resize()
  }, [activeNote, getEditor])
  const handleChangeContent = useCallback(
    (content: string) => {
      dispatch(updateNote({ note: activeNote, content }))
    },
    [dispatch, activeNote]
  )
  const handleOpenPreview = useCallback(() => {
    setPreview(!preview)
  }, [preview, setPreview])

  return (
    <WorkspaceTabPanel
      menu={
        <NoteMenu
          note={activeNote}
          onOpenProperties={() => setPropertiesPanel(!propertiesPanel)}
          onOpenPreview={handleOpenPreview}
        />
      }
      propertiesPanel={
        propertiesPanel ? (
          <NotePropertiesPanel note={activeNote} fontSize={fontSize} onChangeFontSize={(value) => setFontSize(value)} />
        ) : undefined
      }
      onClosePropertiesPanel={() => setPropertiesPanel(false)}
    >
      <RelativeBox width={'100%'} height={'100%'}>
        <AbsoluteBox top={0} bottom={0} left={0} right={preview ? '50%' : 0} onResize={handleResize}>
          {notes.map((note) => (
            <TextEditor
              key={note.id}
              content={note.content}
              keyBinding={editorSettings.keyBinding}
              theme={editorSettings.theme}
              mode={note.contentType}
              fontSize={fontSize}
              height={note.id === activeNote.id ? '100%' : '0'}
              onLoad={(editor) => handleLoad(note.id, editor)}
              onChangeContent={handleChangeContent}
            />
          ))}
        </AbsoluteBox>
        {activeNote.contentType === 'markdown' ? (
          <AbsoluteBox top={0} bottom={0} left={'50%'} right={0} hidden={!preview}>
            <MarkdownViewer content={activeNote.content} />
          </AbsoluteBox>
        ) : (
          <></>
        )}
      </RelativeBox>
    </WorkspaceTabPanel>
  )
}
