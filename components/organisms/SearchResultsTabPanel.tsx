import { searchResultNotesSelector } from '../../store/notes'
import { FlexRow } from '../atoms/layout/Flex'
import Margin from '../atoms/layout/Margin'
import Label from '../atoms/display/Label'
import NoteCard from '../molecules/surfaces/NoteCard'
import { useNotesPage } from '../../hooks/usePages'
import { useNoteDeleteDialog } from '../../hooks/useDialogs'
import SearchResultsMenu from './SearchResultsMenu'
import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import { useSelector } from 'react-redux'

type SearchResultsTabPanelProps = {
  value: string
}

export default function SearchResultsTabPanel({ value }: SearchResultsTabPanelProps) {
  const notes = useSelector(searchResultNotesSelector)
  const openNotePage = useNotesPage()
  const noteDeleteDialog = useNoteDeleteDialog()

  return (
    <WorkspaceTabPanel value={value} menu={<SearchResultsMenu />}>
      <Margin left={2} right={2} bottom={4}>
        <Margin top={3} bottom={3}>
          <Label variant={'caption'}>ノート</Label>
        </Margin>
        <FlexRow>
          {notes.map((note) => (
            <NoteCard
              note={note}
              key={note.id}
              onClickNoteLink={() => openNotePage(note.id)}
              onClickDelete={() => noteDeleteDialog.open(note)}
            />
          ))}
        </FlexRow>
      </Margin>
    </WorkspaceTabPanel>
  )
}
