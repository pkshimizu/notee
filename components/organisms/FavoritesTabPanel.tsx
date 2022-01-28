import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import Label from '../atoms/display/Label'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import FolderCard from '../molecules/surfaces/FolderCard'
import NoteCard from '../molecules/surfaces/NoteCard'
import { useSelector } from 'react-redux'
import { favoriteFoldersSelector, favoriteNotesSelector } from '../../store/notes/selectors'
import { useFolderCreateDialog, useFolderDeleteDialog, useNoteDeleteDialog } from '../../hooks/useDialogs'
import { useFoldersPage, useNotesPage } from '../../hooks/usePages'
import FavoritesMenu from './FavoritesMenu'

type FavoritesTabPanelProps = {}

export default function FavoritesTabPanel({}: FavoritesTabPanelProps) {
  const folders = useSelector(favoriteFoldersSelector)
  const notes = useSelector(favoriteNotesSelector)
  const folderDeleteDialog = useFolderDeleteDialog()
  const folderSettingsDialog = useFolderCreateDialog()
  const noteDeleteDialog = useNoteDeleteDialog()
  const openNotePage = useNotesPage()
  const openFolderPage = useFoldersPage()

  return (
    <WorkspaceTabPanel menu={<FavoritesMenu />}>
      <FlexColumn pl={2} pr={2} pb={4}>
        {folders.length > 0 && (
          <>
            <FlexRow pt={2} pb={2}>
              <Label variant={'caption'}>フォルダ</Label>
            </FlexRow>
            <FlexRow>
              {folders.map((folder) => (
                <FolderCard
                  folder={folder}
                  key={folder.id}
                  onClickFolderLink={() => openFolderPage(folder.id)}
                  onClickSettings={() => folderSettingsDialog.open(folder)}
                  onClickDelete={() => folderDeleteDialog.open(folder)}
                />
              ))}
            </FlexRow>
          </>
        )}
        {notes.length > 0 && (
          <>
            <FlexRow pt={2} pb={2}>
              <Label variant={'caption'}>ノート</Label>
            </FlexRow>
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
          </>
        )}
      </FlexColumn>
    </WorkspaceTabPanel>
  )
}
