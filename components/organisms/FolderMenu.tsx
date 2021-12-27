import { createFolder, createNote, deleteFolder, deleteNote, Folder } from '../../store/notes'
import Flex from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { Dispatch, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import workspaceSlice from '../../store/workspace'
import AppBar from '../atoms/surfaces/AppBar'
import { CreateFolderIcon, CreateNoteIcon, DeleteIcon, SettingsIcon, CloseIcon } from '../atoms/display/Icons'

type FolderMenuProps = {
  folder: Folder
}

const deleteFolderItems = async (dispatch: Dispatch<any>, folder: Folder) => {
  for (const subFolder of folder.folders) {
    await deleteFolderItems(dispatch, subFolder)
  }
  for (const note of folder.notes) {
    await dispatch(deleteNote({ note: note }))
  }
  await dispatch(deleteFolder({ folder: folder }))
}

export default function FolderMenu({ folder }: FolderMenuProps) {
  const dispatch = useDispatch()
  const handleSettings = useCallback(() => {}, [])
  const handleCreateFolder = useCallback(() => {
    dispatch(createFolder({ name: 'new folder', parentFolder: folder }))
  }, [dispatch, folder])
  const handleCreateNote = useCallback(() => {
    dispatch(createNote({ parentFolder: folder }))
  }, [dispatch, folder])
  const handleDeleteFolder = useCallback(() => {
    return deleteFolderItems(dispatch, folder)
  }, [dispatch, folder])
  const handleClose = useCallback(() => {
    dispatch(workspaceSlice.actions.close({ id: folder.id }))
  }, [dispatch, folder])

  return (
    <AppBar>
      <Flex direction={'row'} justify={'space-around'}>
        <Flex direction={'row'}>
          <IconButton onClick={handleSettings}>
            <SettingsIcon color={'white'} />
          </IconButton>
          <IconButton onClick={handleCreateFolder}>
            <CreateFolderIcon color={'white'} />
          </IconButton>
          <IconButton onClick={handleCreateNote}>
            <CreateNoteIcon color={'white'} />
          </IconButton>
          {folder.folderId && (
            <IconButton onClick={handleDeleteFolder}>
              <DeleteIcon />
            </IconButton>
          )}
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
