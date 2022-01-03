import FolderSettingsDialog from '../organisms/FolderSettingsDialog'
import FolderDeleteDialog from '../organisms/FolderDeleteDialog'
import NoteDeleteDialog from '../organisms/NoteDeleteDialog'
import { useFolderDeleteDialog, useFolderSettingsDialog, useNoteDeleteDialog } from '../../hooks/useDialogs'

export default function DialogProvider() {
  const folderSettingsDialog = useFolderSettingsDialog()
  const folderDeleteDialog = useFolderDeleteDialog()
  const noteDeleteDialog = useNoteDeleteDialog()

  return (
    <>
      {folderSettingsDialog.folder && (
        <FolderSettingsDialog
          open={folderSettingsDialog.state}
          folder={folderSettingsDialog.folder}
          onClose={folderSettingsDialog.close}
        />
      )}
      {folderDeleteDialog.folder && (
        <FolderDeleteDialog
          open={folderDeleteDialog.state}
          folder={folderDeleteDialog.folder}
          onClose={folderDeleteDialog.close}
        />
      )}
      {noteDeleteDialog.note && (
        <NoteDeleteDialog open={noteDeleteDialog.state} note={noteDeleteDialog.note} onClose={noteDeleteDialog.close} />
      )}
    </>
  )
}
