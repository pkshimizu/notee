import { createNote, Folder } from '../../store/notes'
import { FlexRow } from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import workspaceSlice from '../../store/workspace'
import AppBar from '../atoms/surfaces/AppBar'
import { CreateFolderIcon, CreateNoteIcon, DeleteIcon, CloseIcon, SidebarIcon, MoveIcon } from '../atoms/display/Icons'
import { useFolderDeleteDialog, useFolderCreateDialog, useFolderMoveDialog } from '../../hooks/useDialogs'

type FolderMenuProps = {
  folder: Folder
  onOpenProperties: () => void
}

export default function FolderMenu({ folder, onOpenProperties }: FolderMenuProps) {
  const folderCreateDialog = useFolderCreateDialog()
  const folderDeleteDialog = useFolderDeleteDialog()
  const folderMoveDialog = useFolderMoveDialog()
  const dispatch = useDispatch()
  const handleCreateNote = useCallback(() => {
    dispatch(createNote({ parentFolder: folder }))
  }, [dispatch, folder])
  const handleClose = useCallback(() => {
    dispatch(workspaceSlice.actions.close({ id: folder.id }))
  }, [dispatch, folder])

  return (
    <AppBar>
      <FlexRow justify={'space-around'}>
        <FlexRow>
          <IconButton onClick={() => folderCreateDialog.open(folder)}>
            <CreateFolderIcon color={'white'} />
          </IconButton>
          <IconButton onClick={handleCreateNote}>
            <CreateNoteIcon color={'white'} />
          </IconButton>
          {folder.folderId && (
            <>
              <IconButton onClick={() => folderMoveDialog.open(folder)}>
                <MoveIcon color={'white'} />
              </IconButton>
              <IconButton onClick={() => folderDeleteDialog.open(folder)}>
                <DeleteIcon color={'white'} />
              </IconButton>
            </>
          )}
        </FlexRow>
        <FlexRow justify={'flex-end'}>
          <IconButton onClick={onOpenProperties}>
            <SidebarIcon color={'white'} />
          </IconButton>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </FlexRow>
      </FlexRow>
    </AppBar>
  )
}
