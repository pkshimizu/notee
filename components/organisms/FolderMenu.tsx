import { createFolder, createNote, deleteFolder, Folder } from '../../store/notes'
import Flex from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import workspaceSlice from '../../store/workspace'
import CloseIcon from '../atoms/display/icons/CloseIcon'
import AppBar from '../atoms/surfaces/AppBar'
import CreateFolderIcon from '../atoms/display/icons/CreateFolderIcon'
import CreateNoteIcon from '../atoms/display/icons/CreateNoteIcon'
import DeleteIcon from '../atoms/display/icons/DeleteIcon'

type FolderMenuProps = {
  folder: Folder
}

export default function FolderMenu({ folder }: FolderMenuProps) {
  const dispatch = useDispatch()
  const handleCreateFolder = useCallback(() => {
    dispatch(createFolder({ name: 'new folder', parentFolder: folder }))
  }, [dispatch, folder])
  const handleCreateNote = useCallback(() => {
    dispatch(createNote({ parentFolder: folder }))
  }, [dispatch, folder])
  const handleDeleteFolder = useCallback(() => {
    dispatch(deleteFolder({ folder: folder }))
  }, [dispatch, folder])
  const handleClose = useCallback(() => {
    dispatch(workspaceSlice.actions.close(folder.id))
  }, [dispatch, folder])

  return (
    <AppBar>
      <Flex direction={'row'} justify={'space-around'}>
        <Flex direction={'row'}>
          <IconButton onClick={handleCreateFolder}>
            <CreateFolderIcon />
          </IconButton>
          <IconButton onClick={handleCreateNote}>
            <CreateNoteIcon />
          </IconButton>
          <IconButton onClick={handleDeleteFolder}>
            <DeleteIcon />
          </IconButton>
        </Flex>
        <Flex direction={'row'} justify={'flex-end'}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Flex>
      </Flex>
    </AppBar>
  )
}
