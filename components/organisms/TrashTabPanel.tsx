import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import { useDispatch, useSelector } from 'react-redux'
import Label from '../atoms/display/Label'
import FolderCard from '../molecules/surfaces/FolderCard'
import NoteCard from '../molecules/surfaces/NoteCard'
import TrashMenu from './TrashMenu'
import { Dispatch, useCallback } from 'react'
import NotesActions from '../../store/notes/actions'
import { File, Folder, Note } from '../../store/notes/models'
import { useFileDeleteDialog, useFolderDeleteDialog, useNoteDeleteDialog } from '../../hooks/useDialogs'
import NotesSelectors from '../../store/notes/selectors'
import FileCard from '../molecules/surfaces/FileCard'

type TrashTabPanelProps = {}

const restoreFolder = (dispatch: Dispatch<any>, folder: Folder) => {
  folder.folders.forEach((subFolder) => restoreFolder(dispatch, subFolder))
  folder.notes.forEach((note) => dispatch(NotesActions.restore({ note: note })))
  dispatch(NotesActions.restore({ folder: folder }))
}

export default function TrashTabPanel({}: TrashTabPanelProps) {
  const folders = useSelector(NotesSelectors.trashFolders)
  const notes = useSelector(NotesSelectors.trashNotes)
  const files = useSelector(NotesSelectors.trashFiles)
  const folderDeleteDialog = useFolderDeleteDialog()
  const noteDeleteDialog = useNoteDeleteDialog()
  const fileDeleteDialog = useFileDeleteDialog()
  const dispatch = useDispatch()
  const handleRestoreFolder = useCallback(
    (folder: Folder) => {
      restoreFolder(dispatch, folder)
    },
    [dispatch]
  )
  const handleRestoreNote = useCallback(
    (note: Note) => {
      dispatch(NotesActions.restore({ note: note }))
    },
    [dispatch]
  )
  const handleRestoreFile = useCallback(
    (file: File) => {
      dispatch(NotesActions.restore({ file: file }))
    },
    [dispatch]
  )

  return (
    <WorkspaceTabPanel menu={<TrashMenu />}>
      <FlexColumn px={2} pb={4}>
        <FlexRow py={2}>
          <Label variant={'caption'} text={{ value: 'Folder' }} />
        </FlexRow>
        <FlexRow>
          {folders.map((folder) => (
            <FolderCard
              folder={folder}
              key={folder.id}
              onClickRestore={handleRestoreFolder}
              onClickDelete={folderDeleteDialog.open}
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
              onClickRestore={handleRestoreNote}
              onClickDelete={noteDeleteDialog.open}
            />
          ))}
        </FlexRow>
        <FlexRow py={2}>
          <Label variant={'caption'} text={{ value: 'File' }} />
        </FlexRow>
        <FlexRow>
          {files.map((file) => (
            <FileCard
              file={file}
              key={file.id}
              onClickRestore={handleRestoreFile}
              onClickDelete={fileDeleteDialog.open}
            />
          ))}
        </FlexRow>
      </FlexColumn>
    </WorkspaceTabPanel>
  )
}
