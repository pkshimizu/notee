import { Folder } from '../../store/notes/models'
import { FlexRow } from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import AppBar from '../atoms/surfaces/AppBar'
import {
  CreateFolderIcon,
  CreateNoteIcon,
  TrashIcon,
  CloseIcon,
  SidebarIcon,
  MoveIcon,
  FavoriteIcon,
  FavoriteOutlinedIcon,
} from '../atoms/display/Icons'
import { useFolderMoveToTrashDialog, useFolderCreateDialog, useFolderMoveDialog } from '../../hooks/useDialogs'
import { createNote, favorite, unFavorite } from '../../store/notes/actions'
import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'

type FolderMenuProps = {
  folder: Folder
  onOpenProperties: () => void
}

export default function FolderMenu({ folder, onOpenProperties }: FolderMenuProps) {
  const folderCreateDialog = useFolderCreateDialog()
  const folderMoveToTrashDialog = useFolderMoveToTrashDialog()
  const folderMoveDialog = useFolderMoveDialog()
  const { close } = useWorkspaceTab()
  const dispatch = useDispatch()
  const handleFavorite = useCallback(() => {
    if (folder.favorite) {
      dispatch(unFavorite({ folder: folder }))
    } else {
      dispatch(favorite({ folder: folder }))
    }
  }, [dispatch, folder])
  const handleCreateNote = useCallback(() => {
    dispatch(createNote({ parentFolder: folder }))
  }, [dispatch, folder])
  const handleClose = useCallback(() => {
    close(folder.id)
  }, [close, folder])

  return (
    <AppBar>
      <FlexRow justify={'space-around'}>
        <FlexRow>
          <IconButton label={'favorite'} onClick={handleFavorite}>
            {folder.favorite ? <FavoriteIcon color={'white'} /> : <FavoriteOutlinedIcon color={'white'} />}
          </IconButton>
          <IconButton label={'create folder'} onClick={() => folderCreateDialog.open(folder)}>
            <CreateFolderIcon color={'white'} />
          </IconButton>
          <IconButton label={'create note'} onClick={handleCreateNote}>
            <CreateNoteIcon color={'white'} />
          </IconButton>
          {folder.folderId && (
            <>
              <IconButton label={'move folder'} onClick={() => folderMoveDialog.open(folder)}>
                <MoveIcon color={'white'} />
              </IconButton>
              <IconButton label={'move folder to trash'} onClick={() => folderMoveToTrashDialog.open(folder)}>
                <TrashIcon color={'white'} />
              </IconButton>
            </>
          )}
        </FlexRow>
        <FlexRow justify={'flex-end'}>
          <IconButton label={'open properties'} onClick={onOpenProperties}>
            <SidebarIcon color={'white'} />
          </IconButton>
          <IconButton label={'close tab'} onClick={handleClose} disabled={folder.folderId === undefined}>
            <CloseIcon color={'white'} />
          </IconButton>
        </FlexRow>
      </FlexRow>
    </AppBar>
  )
}
