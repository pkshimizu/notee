import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import { useDispatch, useSelector } from 'react-redux'
import Label from '../atoms/display/Label'
import FolderCard from '../molecules/surfaces/FolderCard'
import NoteCard from '../molecules/surfaces/NoteCard'
import TrashMenu from './TrashMenu'
import { Dispatch, useCallback } from 'react'
import { restore } from '../../store/notes/actions'
import { Folder, Note } from '../../store/notes/models'
import { useFolderDeleteDialog, useNoteDeleteDialog } from '../../hooks/useDialogs'
import NotesSelectors from '../../store/notes/selectors'

type TrashTabPanelProps = {}

const restoreFolder = (dispatch: Dispatch<any>, folder: Folder) => {
  folder.folders.forEach((subFolder) => restoreFolder(dispatch, subFolder))
  folder.notes.forEach((note) => dispatch(restore({ note: note })))
  dispatch(restore({ folder: folder }))
}

export default function TrashTabPanel({}: TrashTabPanelProps) {
  const folders = useSelector(NotesSelectors.trashFolders)
  const notes = useSelector(NotesSelectors.trashNotes)
  const folderDeleteDialog = useFolderDeleteDialog()
  const noteDeleteDialog = useNoteDeleteDialog()
  const dispatch = useDispatch()
  const handleRestoreFolder = useCallback(
    (folder: Folder) => {
      restoreFolder(dispatch, folder)
    },
    [dispatch]
  )
  const handleRestoreNote = useCallback(
    (note: Note) => {
      dispatch(restore({ note: note }))
    },
    [dispatch]
  )

  return (
    <WorkspaceTabPanel menu={<TrashMenu />}>
      <FlexColumn pl={2} pr={2} pb={4}>
        <FlexRow pt={2} pb={2}>
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
        <FlexRow pt={2} pb={2}>
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
      </FlexColumn>
    </WorkspaceTabPanel>
  )
}
