import { Folder } from '../../store/notes'
import Flex from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import workspaceSlice from '../../store/workspace'
import CloseIcon from '../atoms/display/icons/CloseIcon'

type FolderMenuProps = {
  folder: Folder
}

export default function FolderMenu({ folder }: FolderMenuProps) {
  const dispatch = useDispatch()
  const handleClose = useCallback(() => {
    dispatch(workspaceSlice.actions.close(folder.id))
  }, [dispatch, folder])

  return (
    <Flex direction={'row'}>
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Flex>
  )
}
