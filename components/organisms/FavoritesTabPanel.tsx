import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import Margin from '../atoms/layout/Margin'
import Label from '../atoms/display/Label'
import { FlexRow } from '../atoms/layout/Flex'
import FolderCard from '../molecules/surfaces/FolderCard'
import NoteCard from '../molecules/surfaces/NoteCard'
import { useSelector } from 'react-redux'
import { favoriteFoldersSelector, favoriteNotesSelector } from '../../store/notes/selectors'
import { useFolderCreateDialog, useFolderDeleteDialog, useNoteDeleteDialog } from '../../hooks/useDialogs'
import { useNotesPage } from '../../hooks/usePages'
import FavoritesMenu from './FavoritesMenu'

type FavoritesTabPanelProps = {}

export default function FavoritesTabPanel({}: FavoritesTabPanelProps) {
  const folders = useSelector(favoriteFoldersSelector)
  const notes = useSelector(favoriteNotesSelector)
  const folderDeleteDialog = useFolderDeleteDialog()
  const folderSettingsDialog = useFolderCreateDialog()
  const noteDeleteDialog = useNoteDeleteDialog()
  const openNotePage = useNotesPage()

  return (
    <WorkspaceTabPanel menu={<FavoritesMenu />}>
      <Margin left={2} right={2} bottom={4}>
        {folders.length > 0 && (
          <>
            <Margin top={3} bottom={3}>
              <Label variant={'caption'}>フォルダ</Label>
            </Margin>
            <FlexRow>
              {folders.map((folder) => (
                <FolderCard
                  folder={folder}
                  key={folder.id}
                  onClickFolderLink={() => openNotePage(folder.id)}
                  onClickSettings={() => folderSettingsDialog.open(folder)}
                  onClickDelete={() => folderDeleteDialog.open(folder)}
                />
              ))}
            </FlexRow>
          </>
        )}
        {notes.length > 0 && (
          <>
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
          </>
        )}
      </Margin>
    </WorkspaceTabPanel>
  )
}
