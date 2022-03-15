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
import {
  useFileDeleteDialog,
  useFileMoveDialog,
  useFileMoveToTrashDialog,
  useFileUploadDialog,
  useFolderCreateDialog,
  useFolderDeleteDialog,
  useFolderMoveDialog,
  useFolderMoveToTrashDialog,
  useNoteDeleteDialog,
  useNoteLogDialog,
  useNoteMoveDialog,
  useNoteMoveToTrashDialog,
  useTrashEmptyDialog,
} from '../../hooks/useDialogs'
import FileDeleteDialog from '../organisms/FileDeleteDialog'
import FileMoveDialog from '../organisms/FileMoveDialog'

export default function DialogProvider() {
  const folderCreateDialog = useFolderCreateDialog()
  const folderMoveToTrashDialog = useFolderMoveToTrashDialog()
  const folderMoveDialog = useFolderMoveDialog()
  const folderDeleteDialog = useFolderDeleteDialog()
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()
  const noteMoveDialog = useNoteMoveDialog()
  const noteLogDialog = useNoteLogDialog()
  const noteDeleteDialog = useNoteDeleteDialog()
  const trashEmptyDialog = useTrashEmptyDialog()
  const fileUploadDialog = useFileUploadDialog()
  const fileMoveDialog = useFileMoveDialog()
  const fileMoveToTrashDialog = useFileMoveToTrashDialog()
  const fileDeleteDialog = useFileDeleteDialog()

  return (
    <>
      {folderCreateDialog.state && <FolderCreateDialog folder={folderCreateDialog.state.folder} />}
      {folderMoveToTrashDialog.state && <FolderMoveToTrashDialog folder={folderMoveToTrashDialog.state.folder} />}
      {folderMoveDialog.state && <FolderMoveDialog folder={folderMoveDialog.state.folder} />}
      {folderDeleteDialog.state && <FolderDeleteDialog folder={folderDeleteDialog.state.folder} />}
      {noteMoveToTrashDialog.state && <NoteMoveToTrashDialog note={noteMoveToTrashDialog.state.note} />}
      {noteMoveDialog.state && <NoteMoveDialog note={noteMoveDialog.state.note} />}
      {noteLogDialog.state && <NoteLogDialog note={noteLogDialog.state.note} log={noteLogDialog.state.log} />}
      {noteDeleteDialog.state && <NoteDeleteDialog note={noteDeleteDialog.state.note} />}
      {trashEmptyDialog.state && <TrashEmptyDialog />}
      {fileUploadDialog.state && <FileUploadDialog folder={fileUploadDialog.state.folder} />}
      {fileMoveDialog.state && <FileMoveDialog file={fileMoveDialog.state.file} />}
      {fileMoveToTrashDialog.state && <FileMoveToTrashDialog file={fileMoveToTrashDialog.state.file} />}
      {fileDeleteDialog.state && <FileDeleteDialog file={fileDeleteDialog.state.file} />}
    </>
  )
}
