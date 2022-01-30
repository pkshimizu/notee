import { searchResultNotesSelector } from '../../store/notes/selectors'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import Label from '../atoms/display/Label'
import NoteCard from '../molecules/surfaces/NoteCard'
import { useNotesPage } from '../../hooks/usePages'
import { useNoteMoveToTrashDialog } from '../../hooks/useDialogs'
import SearchResultsMenu from './SearchResultsMenu'
import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import { useSelector } from 'react-redux'

type SearchResultsTabPanelProps = {}

export default function SearchResultsTabPanel({}: SearchResultsTabPanelProps) {
  const notes = useSelector(searchResultNotesSelector)
  const openNotePage = useNotesPage()
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()

  return (
    <WorkspaceTabPanel menu={<SearchResultsMenu />}>
      <FlexColumn pl={2} pr={2} pb={4}>
        <FlexRow pt={2} pb={2}>
          <Label variant={'caption'}>ノート</Label>
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
