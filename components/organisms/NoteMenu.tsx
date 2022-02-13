import { Note } from '../../store/notes/models'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import AppBar from '../atoms/surfaces/AppBar'
import {
  CloseIcon,
  TrashIcon,
  FavoriteIcon,
  FavoriteOutlinedIcon,
  MoveIcon,
  SidebarIcon,
  UndoIcon,
  RedoIcon,
} from '../atoms/display/Icons'
import { FlexRow } from '../atoms/layout/Flex'
import { useNoteMoveToTrashDialog, useNoteMoveDialog } from '../../hooks/useDialogs'
import { favorite, unFavorite } from '../../store/notes/actions'
import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'
import Divider from '../atoms/display/Divider'

type NoteMenuProps = {
  note: Note
  onOpenProperties: () => void
}

export default function NoteMenu({ note, onOpenProperties }: NoteMenuProps) {
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()
  const noteMoveDialog = useNoteMoveDialog()
  const { close } = useWorkspaceTab()
  const dispatch = useDispatch()
  const handleFavorite = useCallback(() => {
    if (note.favorite) {
      dispatch(unFavorite({ note: note }))
    } else {
      dispatch(favorite({ note: note }))
    }
  }, [dispatch, note])
  const handleClose = useCallback(() => {
    close(note.id)
  }, [close, note])

  return (
    <AppBar>
      <FlexRow justify={'space-around'}>
        <FlexRow>
          <IconButton label={'favorite'} color={'white'} onClick={handleFavorite}>
            {note.favorite ? <FavoriteIcon /> : <FavoriteOutlinedIcon />}
          </IconButton>
          <IconButton label={'move note'} color={'white'} onClick={() => noteMoveDialog.open(note)}>
            <MoveIcon />
          </IconButton>
          <IconButton label={'move note to trash'} color={'white'} onClick={() => noteMoveToTrashDialog.open(note)}>
            <TrashIcon />
          </IconButton>
          <Divider vertical />
          <IconButton label={'undo note content'} color={'white'} onClick={() => {}}>
            <UndoIcon />
          </IconButton>
          <IconButton label={'redo note content'} color={'white'} onClick={() => {}}>
            <RedoIcon />
          </IconButton>
        </FlexRow>
        <FlexRow justify={'flex-end'}>
          <IconButton label={'open properties'} color={'white'} onClick={onOpenProperties}>
            <SidebarIcon />
          </IconButton>
          <IconButton label={'close tab'} color={'white'} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </FlexRow>
      </FlexRow>
    </AppBar>
  )
}
