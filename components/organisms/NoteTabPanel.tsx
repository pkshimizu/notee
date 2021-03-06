import { Note } from '../../store/notes/models'
import NoteMenu from './NoteMenu'
import TextEditor from '../atoms/inputs/TextEditor'
import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NotePropertiesPanel from './NotePropertiesPanel'
import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import NotesActions from '../../store/notes/actions'
import { useEditor } from '../../hooks/useEditor'
import MarkdownViewer from '../atoms/display/MarkdownViewer'
import RelativeBox from '../atoms/layout/RelativeBox'
import AbsoluteBox from '../atoms/layout/AbsoluteBox'
import SessionSelectors from '../../store/session/selectors'

type NoteTabPanelProps = {
  notes: Note[]
  activeNote: Note
}

export default function NoteTabPanel({ notes, activeNote }: NoteTabPanelProps) {
  const { getEditor, setEditor, fontSize, editorRight, previewLeft, cursor } = useEditor(activeNote)
  const [propertiesPanel, setPropertiesPanel] = useState(false)
  const editorSettings = useSelector(SessionSelectors.editorSettings)
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
      dispatch(NotesActions.updateNote({ note: activeNote, content }))
    },
    [dispatch, activeNote]
  )
  const editors = useMemo(() => {
    return (
      <AbsoluteBox top={0} bottom={0} left={0} right={editorRight} onResize={handleResize}>
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
    )
  }, [editorRight, handleResize, notes, editorSettings, fontSize, activeNote, handleLoad, handleChangeContent])

  return (
    <WorkspaceTabPanel
      menu={<NoteMenu note={activeNote} onOpenProperties={() => setPropertiesPanel(!propertiesPanel)} />}
      propertiesPanel={propertiesPanel ? <NotePropertiesPanel note={activeNote} /> : undefined}
      onClosePropertiesPanel={() => setPropertiesPanel(false)}
    >
      <RelativeBox width={'100%'} height={'100%'}>
        {editors}
        {activeNote.contentType === 'markdown' && (
          <AbsoluteBox top={0} bottom={0} left={previewLeft} right={0} hidden={previewLeft === '100%'}>
            <MarkdownViewer content={activeNote.content} row={cursor?.row} />
          </AbsoluteBox>
        )}
      </RelativeBox>
    </WorkspaceTabPanel>
  )
}
