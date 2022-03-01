import { useSelector } from 'react-redux'
import NotesSelectors from '../../store/notes/selectors'
import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import Label from '../atoms/display/Label'
import NoteCard from '../molecules/surfaces/NoteCard'
import { useNoteMoveToTrashDialog } from '../../hooks/useDialogs'
import RecentMenu from './RecentMenu'
import { useNotesPage } from '../../hooks/usePages'

export default function RecentTabPanel() {
  const notes = useSelector(NotesSelectors.recentNotes)
  const openNotePage = useNotesPage()
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()

  return (
    <WorkspaceTabPanel menu={<RecentMenu />}>
      <FlexColumn px={2} pb={4}>
        <FlexRow py={2}>
          <Label variant={'caption'} text={{ value: 'Note' }} />
        </FlexRow>
        <FlexRow>
          {notes.map((note) => (
            <NoteCard
              note={note}
              key={note.id}
              onClickNoteLink={() => openNotePage(note.id)}
              onClickMoveToTrash={noteMoveToTrashDialog.open}
            />
          ))}
        </FlexRow>
      </FlexColumn>
    </WorkspaceTabPanel>
  )
}
