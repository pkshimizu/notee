import FolderCreateDialog from '../organisms/FolderCreateDialog'
import FolderMoveToTrashDialog from '../organisms/FolderMoveToTrashDialog'
import NoteMoveToTrashDialog from '../organisms/NoteMoveToTrashDialog'
import NoteLogDialog from '../organisms/NoteLogDialog'
import FolderMoveDialog from '../organisms/FolderMoveDialog'
import NoteMoveDialog from '../organisms/NoteMoveDialog'
import FolderDeleteDialog from '../organisms/FolderDeleteDialog'
import NoteDeleteDialog from '../organisms/NoteDeleteDialog'
import FileUploadDialog from '../organisms/FileUploadDialog'
import TrashEmptyDialog from '../organisms/TrashEmptyDialog'
import FileMoveToTrashDialog from '../organisms/FileMoveToTrashDialog'
import { useFileDeleteDialog, useFileMoveToTrashDialog } from '../../hooks/useDialogs'
import FileDeleteDialog from '../organisms/FileDeleteDialog'

export default function DialogProvider() {
  const fileMoveToTrashDialog = useFileMoveToTrashDialog()
  const fileDeleteDialog = useFileDeleteDialog()

  return (
    <>
      <FolderCreateDialog />
      <FolderMoveToTrashDialog />
      <FolderMoveDialog />
      <FolderDeleteDialog />
      <NoteMoveToTrashDialog />
      <NoteMoveDialog />
      <NoteLogDialog />
      <NoteDeleteDialog />
      <TrashEmptyDialog />
      <FileUploadDialog />
      {fileMoveToTrashDialog.state && <FileMoveToTrashDialog file={fileMoveToTrashDialog.state.file} />}
      {fileDeleteDialog.state && <FileDeleteDialog file={fileDeleteDialog.state.file} />}
    </>
  )
}
