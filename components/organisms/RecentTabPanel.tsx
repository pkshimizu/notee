import { useSelector } from 'react-redux'
import NotesSelectors from '../../store/notes/selectors'
import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import Label from '../atoms/display/Label'
import NoteCard from '../molecules/surfaces/NoteCard'
import { useNoteDeleteDialog } from '../../hooks/useDialogs'
import RecentMenu from './RecentMenu'

export default function RecentTabPanel() {
  const notes = useSelector(NotesSelectors.recentNotes)
  const noteDeleteDialog = useNoteDeleteDialog()

  return (
    <WorkspaceTabPanel menu={<RecentMenu />}>
      <FlexColumn pl={2} pr={2} pb={4}>
        <FlexRow pt={2} pb={2}>
          <Label variant={'caption'} text={{ value: 'Note' }} />
        </FlexRow>
        <FlexRow>
          {notes.map((note) => (
            <NoteCard note={note} key={note.id} onClickDelete={noteDeleteDialog.open} />
          ))}
        </FlexRow>
      </FlexColumn>
    </WorkspaceTabPanel>
  )
}
