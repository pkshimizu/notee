import { searchResultFoldersSelector, searchResultNotesSelector } from '../../store/notes/selectors'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import Label from '../atoms/display/Label'
import NoteCard from '../molecules/surfaces/NoteCard'
import { useFoldersPage, useNotesPage } from '../../hooks/usePages'
import { useFolderMoveToTrashDialog, useNoteMoveToTrashDialog } from '../../hooks/useDialogs'
import SearchResultsMenu from './SearchResultsMenu'
import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import { useSelector } from 'react-redux'
import FolderCard from '../molecules/surfaces/FolderCard'

type SearchResultsTabPanelProps = {}

export default function SearchResultsTabPanel({}: SearchResultsTabPanelProps) {
  const notes = useSelector(searchResultNotesSelector)
  const folders = useSelector(searchResultFoldersSelector)
  const openNotePage = useNotesPage()
  const openFolderPage = useFoldersPage()
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()
  const folderMoveToTrashDialog = useFolderMoveToTrashDialog()

  return (
    <WorkspaceTabPanel menu={<SearchResultsMenu />}>
      <FlexColumn pl={2} pr={2} pb={4}>
        <FlexRow pt={2} pb={2}>
          <Label variant={'caption'} text={'Folder'} />
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
        <FlexRow pt={2} pb={2}>
          <Label variant={'caption'} text={'Note'} />
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
