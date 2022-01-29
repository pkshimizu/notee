import WorkspaceTabPanel from '../molecules/navigation/WorkspaceTabPanel'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import { useSelector } from 'react-redux'
import { deletedFoldersSelector, deletedNotesSelector } from '../../store/notes/selectors'
import Label from '../atoms/display/Label'
import FolderCard from '../molecules/surfaces/FolderCard'
import NoteCard from '../molecules/surfaces/NoteCard'
import TrashMenu from './TrashMenu'
import { useFolderDeleteDialog, useNoteDeleteDialog } from '../../hooks/useDialogs'

type TrashTabPanelProps = {}

export default function TrashTabPanel({}: TrashTabPanelProps) {
  const folders = useSelector(deletedFoldersSelector)
  const notes = useSelector(deletedNotesSelector)
  const folderDeleteDialog = useFolderDeleteDialog()
  const noteDeleteDialog = useNoteDeleteDialog()
  
  return (
    <WorkspaceTabPanel menu={<TrashMenu />}>
      <FlexColumn pl={2} pr={2} pb={4}>
        {folders.length > 0 && (
          <>
            <FlexRow pt={2} pb={2}>
              <Label variant={'caption'}>フォルダ</Label>
            </FlexRow>
            <FlexRow>
              {folders.map((folder) => (
                <FolderCard folder={folder} key={folder.id} onClickDelete={() => folderDeleteDialog.open(folder)} />
              ))}
            </FlexRow>
          </>
        )}
        {notes.length > 0 && (
          <>
            <FlexRow pt={2} pb={2}>
              <Label variant={'caption'}>ノート</Label>
            </FlexRow>
            <FlexRow>
              {notes.map((note) => (
                <NoteCard note={note} key={note.id} onClickDelete={() => noteDeleteDialog.open(note)} />
              ))}
            </FlexRow>
          </>
        )}
      </FlexColumn>
    </WorkspaceTabPanel>
  )
}
