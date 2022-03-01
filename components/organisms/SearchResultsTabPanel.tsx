import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import Label from '../atoms/display/Label'
import NoteCard from '../molecules/surfaces/NoteCard'
import { useFoldersPage, useNotesPage } from '../../hooks/usePages'
import { useFolderMoveToTrashDialog, useNoteMoveToTrashDialog } from '../../hooks/useDialogs'
import SearchResultsMenu from './SearchResultsMenu'
import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import { useSelector } from 'react-redux'
import FolderCard from '../molecules/surfaces/FolderCard'
import NotesSelectors from '../../store/notes/selectors'

type SearchResultsTabPanelProps = {}

export default function SearchResultsTabPanel({}: SearchResultsTabPanelProps) {
  const notes = useSelector(NotesSelectors.searchResultNotes)
  const folders = useSelector(NotesSelectors.searchResultFolders)
  const openNotePage = useNotesPage()
  const openFolderPage = useFoldersPage()
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()
  const folderMoveToTrashDialog = useFolderMoveToTrashDialog()

  return (
    <WorkspaceTabPanel menu={<SearchResultsMenu />}>
      <FlexColumn px={2} pb={4}>
        <FlexRow py={2}>
          <Label variant={'caption'} text={{ value: 'Folder' }} />
        </FlexRow>
        <FlexRow>
          {folders.map((folder) => (
            <FolderCard
              folder={folder}
              key={folder.id}
              onClickFolderLink={() => openFolderPage(folder.id)}
              onClickMoveToTrash={folderMoveToTrashDialog.open}
            />
          ))}
        </FlexRow>
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
