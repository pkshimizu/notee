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
  useFolderDeleteDialog,
  useNoteDeleteDialog,
  useTrashEmptyDialog,
} from '../../hooks/useDialogs'
import NoteLogDialog from '../organisms/NoteLogDialog'
import FolderMoveDialog from '../organisms/FolderMoveDialog'
import NoteMoveDialog from '../organisms/NoteMoveDialog'
import FolderDeleteDialog from '../organisms/FolderDeleteDialog'
import NoteDeleteDialog from '../organisms/NoteDeleteDialog'
import TrashEmptyDialog from '../organisms/TrashEmptyDialog'

export default function DialogProvider() {
  const folderSettingsDialog = useFolderCreateDialog()
  const folderMoveToTrashDialog = useFolderMoveToTrashDialog()
  const folderMoveDialog = useFolderMoveDialog()
  const folderDeleteDialog = useFolderDeleteDialog()
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()
  const noteMoveDialog = useNoteMoveDialog()
  const noteLogDialog = useNoteLogDialog()
  const noteDeleteDialog = useNoteDeleteDialog()
  const trashEmptyDialog = useTrashEmptyDialog()

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
      {folderDeleteDialog.folder && (
        <FolderDeleteDialog
          open={folderDeleteDialog.state}
          folder={folderDeleteDialog.folder}
          onClose={folderDeleteDialog.close}
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
      {noteDeleteDialog.note && (
        <NoteDeleteDialog open={noteDeleteDialog.state} note={noteDeleteDialog.note} onClose={noteDeleteDialog.close} />
      )}
      {trashEmptyDialog.state && <TrashEmptyDialog open={trashEmptyDialog.state} onClose={trashEmptyDialog.close} />}
    </>
  )
}
