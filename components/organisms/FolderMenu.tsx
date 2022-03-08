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
  UploadIcon,
} from '../atoms/display/Icons'
import {
  useFolderMoveToTrashDialog,
  useFolderCreateDialog,
  useFolderMoveDialog,
  useFileUploadDialog,
} from '../../hooks/useDialogs'
import NotesActions from '../../store/notes/actions'
import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'

type FolderMenuProps = {
  folder: Folder
  onOpenProperties: () => void
}

export default function FolderMenu({ folder, onOpenProperties }: FolderMenuProps) {
  const folderCreateDialog = useFolderCreateDialog()
  const folderMoveToTrashDialog = useFolderMoveToTrashDialog()
  const folderMoveDialog = useFolderMoveDialog()
  const fileUploadDialog = useFileUploadDialog()
  const { close } = useWorkspaceTab()
  const dispatch = useDispatch()
  const handleFavorite = useCallback(() => {
    if (folder.favorite) {
      dispatch(NotesActions.unFavorite({ folder: folder }))
    } else {
      dispatch(NotesActions.favorite({ folder: folder }))
    }
  }, [dispatch, folder])
  const handleCreateNote = useCallback(() => {
    dispatch(NotesActions.createNote({ parentFolder: folder }))
  }, [dispatch, folder])
  const handleClose = useCallback(() => {
    close(folder.id)
  }, [close, folder])

  return (
    <AppBar>
      <FlexRow justify={'space-around'}>
        <FlexRow>
          <IconButton label={{ value: 'Favorites' }} color={'white'} onClick={handleFavorite}>
            {folder.favorite ? <FavoriteIcon /> : <FavoriteOutlinedIcon />}
          </IconButton>
          <IconButton
            label={{ value: 'Create folder' }}
            color={'white'}
            onClick={() => folderCreateDialog.open(folder)}
          >
            <CreateFolderIcon />
          </IconButton>
          <IconButton label={{ value: 'Create note' }} color={'white'} onClick={handleCreateNote}>
            <CreateNoteIcon />
          </IconButton>
          <IconButton label={{ value: 'Upload file' }} color={'white'} onClick={fileUploadDialog.open}>
            <UploadIcon />
          </IconButton>
          {folder.folderId && (
            <>
              <IconButton
                label={{ value: 'Move folder' }}
                color={'white'}
                onClick={() => folderMoveDialog.open(folder)}
              >
                <MoveIcon />
              </IconButton>
              <IconButton
                label={{ value: 'Move folder to trash' }}
                color={'white'}
                onClick={() => folderMoveToTrashDialog.open(folder)}
              >
                <TrashIcon />
              </IconButton>
            </>
          )}
        </FlexRow>
        <FlexRow justify={'flex-end'}>
          <IconButton label={{ value: 'Open properties' }} color={'white'} onClick={onOpenProperties}>
            <SidebarIcon />
          </IconButton>
          <IconButton
            label={{ value: 'Close tab' }}
            color={'white'}
            onClick={handleClose}
            disabled={folder.folderId === undefined}
          >
            <CloseIcon />
          </IconButton>
        </FlexRow>
      </FlexRow>
    </AppBar>
  )
}
