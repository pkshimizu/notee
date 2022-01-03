import { createFolder, createNote, deleteFolder, deleteNote, Folder } from '../../store/notes'
import { FlexRow } from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import workspaceSlice from '../../store/workspace'
import AppBar from '../atoms/surfaces/AppBar'
import { CreateFolderIcon, CreateNoteIcon, DeleteIcon, SettingsIcon, CloseIcon } from '../atoms/display/Icons'
import { useFolderDeleteDialog, useFolderSettingsDialog } from '../../hooks/useDialogs'

type FolderMenuProps = {
  folder: Folder
}

export default function FolderMenu({ folder }: FolderMenuProps) {
  const folderSettingsDialog = useFolderSettingsDialog()
  const folderDeleteDialog = useFolderDeleteDialog()
  const dispatch = useDispatch()
  const handleCreateFolder = useCallback(() => {
    dispatch(createFolder({ name: 'new folder', parentFolder: folder }))
  }, [dispatch, folder])
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
          <IconButton onClick={() => folderSettingsDialog.open(folder)}>
            <SettingsIcon color={'white'} />
          </IconButton>
          <IconButton onClick={handleCreateFolder}>
            <CreateFolderIcon color={'white'} />
          </IconButton>
          <IconButton onClick={handleCreateNote}>
            <CreateNoteIcon color={'white'} />
          </IconButton>
          {folder.folderId && (
            <IconButton onClick={() => folderDeleteDialog.open(folder)}>
              <DeleteIcon color={'white'} />
            </IconButton>
          )}
        </FlexRow>
        <FlexRow justify={'flex-end'}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </FlexRow>
      </FlexRow>
    </AppBar>
  )
}
