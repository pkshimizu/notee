import FolderCreateDialog from '../organisms/FolderCreateDialog'
import FolderMoveToTrashDialog from '../organisms/FolderMoveToTrashDialog'
import NoteMoveToTrashDialog from '../organisms/NoteMoveToTrashDialog'
import {
  useFolderMoveToTrashDialog,
  useFolderCreateDialog,
  useNoteMoveToTrashDialog,
  useNoteLogDialog,
  useFolderMoveDialog,
  useNoteMoveDialog,
} from '../../hooks/useDialogs'
import NoteLogDialog from '../organisms/NoteLogDialog'
import FolderMoveDialog from '../organisms/FolderMoveDialog'
import NoteMoveDialog from '../organisms/NoteMoveDialog'

export default function DialogProvider() {
  const folderSettingsDialog = useFolderCreateDialog()
  const folderMoveToTrashDialog = useFolderMoveToTrashDialog()
  const folderMoveDialog = useFolderMoveDialog()
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()
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
      {folderMoveToTrashDialog.folder && (
        <FolderMoveToTrashDialog
          open={folderMoveToTrashDialog.state}
          folder={folderMoveToTrashDialog.folder}
          onClose={folderMoveToTrashDialog.close}
        />
      )}
      {folderMoveDialog.folder && (
        <FolderMoveDialog
          open={folderMoveDialog.state}
          folder={folderMoveDialog.folder}
          onClose={folderMoveDialog.close}
        />
      )}
      {noteMoveToTrashDialog.note && (
        <NoteMoveToTrashDialog
          open={noteMoveToTrashDialog.state}
          note={noteMoveToTrashDialog.note}
          onClose={noteMoveToTrashDialog.close}
        />
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
