import { Note } from '../../store/notes'
import { FlexRow } from '../atoms/layout/Flex'
import Margin from '../atoms/layout/Margin'
import Label from '../atoms/display/Label'
import NoteCard from '../molecules/surfaces/NoteCard'
import { useNotesPage } from '../../hooks/usePages'
import { useEffect, useState } from 'react'
import { useNoteDeleteDialog } from '../../hooks/useDialogs'
import SearchResultsMenu from './SearchResultsMenu'
import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'

type SearchResultsTabPanelProps = {
  value: string
  notes: Note[]
  noteIds: string[]
}

export default function SearchResultsTabPanel({ value, notes, noteIds }: SearchResultsTabPanelProps) {
  const openNotePage = useNotesPage()
  const noteDeleteDialog = useNoteDeleteDialog()
  const [searchedNotes, setSearchedNotes] = useState<Note[]>([])
  useEffect(() => {
    setSearchedNotes(notes.filter((note) => noteIds.includes(note.id)))
  }, [notes, noteIds])

  return (
    <WorkspaceTabPanel value={value} menu={<SearchResultsMenu />}>
      <Margin left={2} right={2} bottom={4}>
        <Margin top={3} bottom={3}>
          <Label variant={'caption'}>ノート</Label>
        </Margin>
        <FlexRow>
          {searchedNotes.map((note) => (
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
