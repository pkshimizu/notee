import FolderCreateDialog from '../organisms/FolderCreateDialog'
import FolderDeleteDialog from '../organisms/FolderDeleteDialog'
import NoteDeleteDialog from '../organisms/NoteDeleteDialog'
import {
  useFolderDeleteDialog,
  useFolderCreateDialog,
  useNoteDeleteDialog,
  useNoteLogDialog,
  useFolderMoveDialog,
  useNoteMoveDialog,
} from '../../hooks/useDialogs'
import NoteLogDialog from '../organisms/NoteLogDialog'
import FolderMoveDialog from '../organisms/FolderMoveDialog'
import NoteMoveDialog from '../organisms/NoteMoveDialog'

export default function DialogProvider() {
  const folderSettingsDialog = useFolderCreateDialog()
  const folderDeleteDialog = useFolderDeleteDialog()
  const folderMoveDialog = useFolderMoveDialog()
  const noteDeleteDialog = useNoteDeleteDialog()
  const noteMoveDialog = useNoteMoveDialog()
  const noteLogDialog = useNoteLogDialog()

  return (
    <>
      {folderSettingsDialog.folder && (
        <FolderCreateDialog
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
      {folderMoveDialog.folder && (
        <FolderMoveDialog
          open={folderMoveDialog.state}
          folder={folderMoveDialog.folder}
          onClose={folderMoveDialog.close}
        />
      )}
      {noteDeleteDialog.note && (
        <NoteDeleteDialog open={noteDeleteDialog.state} note={noteDeleteDialog.note} onClose={noteDeleteDialog.close} />
      )}
      {noteMoveDialog.note && (
        <NoteMoveDialog open={noteMoveDialog.state} note={noteMoveDialog.note} onClose={noteMoveDialog.close} />
      )}
      {noteLogDialog.note && noteLogDialog.log && (
        <NoteLogDialog
          open={noteLogDialog.state}
          note={noteLogDialog.note}
          log={noteLogDialog.log}
          onClose={noteLogDialog.close}
        />
      )}
    </>
  )
}
