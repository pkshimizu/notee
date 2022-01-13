import { Note } from '../../store/notes'
import TabPanel from '../atoms/navigation/TabPanel'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import RelativeBox from '../atoms/layout/RelativeBox'
import AbsoluteBox from '../atoms/layout/AbsoluteBox'
import Margin from '../atoms/layout/Margin'
import Label from '../atoms/display/Label'
import NoteCard from '../molecules/surfaces/NoteCard'
import { useNotesPage } from '../../hooks/usePages'
import { useEffect, useState } from 'react'
import { useNoteDeleteDialog } from '../../hooks/useDialogs'
import SearchResultsMenu from './SearchResultsMenu'

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
    <TabPanel value={value}>
      <FlexColumn space={0} height={'100%'}>
        <SearchResultsMenu />
        <FlexRow>
          <RelativeBox width={'100%'} height={'100%'}>
            <AbsoluteBox top={0} bottom={0} left={0} right={0}>
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
            </AbsoluteBox>
          </RelativeBox>
        </FlexRow>
      </FlexColumn>
    </TabPanel>
  )
}
