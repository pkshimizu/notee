import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import Label from '../atoms/display/Label'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import FolderCard from '../molecules/surfaces/FolderCard'
import NoteCard from '../molecules/surfaces/NoteCard'
import { useSelector } from 'react-redux'
import { useFolderMoveToTrashDialog, useNoteMoveToTrashDialog } from '../../hooks/useDialogs'
import { useFoldersPage, useNotesPage } from '../../hooks/usePages'
import FavoritesMenu from './FavoritesMenu'
import NotesSelectors from '../../store/notes/selectors'

type FavoritesTabPanelProps = {}

export default function FavoritesTabPanel({}: FavoritesTabPanelProps) {
  const folders = useSelector(NotesSelectors.favoriteFolders)
  const notes = useSelector(NotesSelectors.favoriteNotes)
  const folderMoveToTrashDialog = useFolderMoveToTrashDialog()
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()
  const openNotePage = useNotesPage()
  const openFolderPage = useFoldersPage()

  return (
    <WorkspaceTabPanel menu={<FavoritesMenu />}>
      <FlexColumn px={2} pb={4}>
        <FlexRow py={2}>
          <Label variant={'caption'} text={{ value: 'Folder' }} />
        </FlexRow>
        <FlexRow>
          {folders.map((folder) => (
            <FolderCard
              folder={folder}
              key={folder.id}
              onClickFolderLink={(folder) => openFolderPage(folder.id)}
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
