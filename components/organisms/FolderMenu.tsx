import { createFolder, createNote, deleteFolder, deleteNote, Folder } from '../../store/notes'
import { FlexRow } from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import workspaceSlice from '../../store/workspace'
import AppBar from '../atoms/surfaces/AppBar'
import { CreateFolderIcon, CreateNoteIcon, DeleteIcon, SettingsIcon, CloseIcon } from '../atoms/display/Icons'
import FolderSettingsDialog from './FolderSettingsDialog'
import FolderDeleteDialog from './FolderDeleteDialog'

type FolderMenuProps = {
  folder: Folder
}

export default function FolderMenu({ folder }: FolderMenuProps) {
  const [openSettings, setOpenSettings] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const dispatch = useDispatch()
  const handleOpenSettings = useCallback(() => {
    setOpenSettings(true)
  }, [])
  const handleCloseSettings = useCallback(() => {
    setOpenSettings(false)
  }, [])
  const handleCreateFolder = useCallback(() => {
    dispatch(createFolder({ name: 'new folder', parentFolder: folder }))
  }, [dispatch, folder])
  const handleCreateNote = useCallback(() => {
    dispatch(createNote({ parentFolder: folder }))
  }, [dispatch, folder])
  const handleOpenDelete = useCallback(() => {
    setOpenDelete(true)
  }, [])
  const handleCloseDelete = useCallback(() => {
    setOpenDelete(false)
  }, [])
  const handleClose = useCallback(() => {
    dispatch(workspaceSlice.actions.close({ id: folder.id }))
  }, [dispatch, folder])

  return (
    <AppBar>
      <FlexRow justify={'space-around'}>
        <FlexRow>
          <IconButton onClick={handleOpenSettings}>
            <SettingsIcon color={'white'} />
          </IconButton>
          <FolderSettingsDialog open={openSettings} folder={folder} onClose={handleCloseSettings} />
          <IconButton onClick={handleCreateFolder}>
            <CreateFolderIcon color={'white'} />
          </IconButton>
          <IconButton onClick={handleCreateNote}>
            <CreateNoteIcon color={'white'} />
          </IconButton>
          {folder.folderId && (
            <IconButton onClick={handleOpenDelete}>
              <DeleteIcon color={'white'} />
            </IconButton>
          )}
          <FolderDeleteDialog open={openDelete} folder={folder} onClose={handleCloseDelete} />
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
