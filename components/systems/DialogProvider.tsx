import FolderCreateDialog from '../organisms/FolderCreateDialog'
import FolderMoveToTrashDialog from '../organisms/FolderMoveToTrashDialog'
import NoteMoveToTrashDialog from '../organisms/NoteMoveToTrashDialog'
import NoteLogDialog from '../organisms/NoteLogDialog'
import FolderMoveDialog from '../organisms/FolderMoveDialog'
import NoteMoveDialog from '../organisms/NoteMoveDialog'
import FolderDeleteDialog from '../organisms/FolderDeleteDialog'
import NoteDeleteDialog from '../organisms/NoteDeleteDialog'
import FileUploadDialog from '../organisms/FileUploadDialog'

export default function DialogProvider() {
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
      <FileUploadDialog />
    </>
  )
}
