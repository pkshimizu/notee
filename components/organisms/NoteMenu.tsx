import { Note } from '../../store/notes/models'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback, useEffect, useState } from 'react'
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
  VerticalSplitIcon,
  PreviewIcon,
} from '../atoms/display/Icons'
import { FlexRow } from '../atoms/layout/Flex'
import { useNoteMoveToTrashDialog, useNoteMoveDialog } from '../../hooks/useDialogs'
import { favorite, unFavorite } from '../../store/notes/actions'
import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'
import Divider from '../atoms/display/Divider'
import { useEditor } from '../../hooks/useEditor'
import { useDeviceType } from '../../hooks/useDeviceType'

type NoteMenuProps = {
  note: Note
  onOpenProperties: () => void
  onOpenPreview: (_size: 'half' | 'full') => void
}

export default function NoteMenu({ note, onOpenProperties, onOpenPreview }: NoteMenuProps) {
  const noteMoveToTrashDialog = useNoteMoveToTrashDialog()
  const noteMoveDialog = useNoteMoveDialog()
  const { undo, redo, canUndo, canRedo } = useEditor()
  const [undoDisabled, setUndoDisabled] = useState(false)
  const [redoDisabled, setRedoDisabled] = useState(false)
  const { close } = useWorkspaceTab()
  const deviceType = useDeviceType()
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
  useEffect(() => {
    setUndoDisabled(!canUndo(note.id))
    setRedoDisabled(!canRedo(note.id))
  }, [note, canUndo, canRedo])
  const handleUndo = useCallback(() => {
    undo(note.id)
  }, [note, undo])
  const handleRedo = useCallback(() => {
    redo(note.id)
  }, [note, redo])

  return (
    <AppBar>
      <FlexRow justify={'space-around'}>
        <FlexRow>
          <IconButton label={{ value: 'Favorites' }} color={'white'} onClick={handleFavorite}>
            {note.favorite ? <FavoriteIcon /> : <FavoriteOutlinedIcon />}
          </IconButton>
          <IconButton label={{ value: 'Move note' }} color={'white'} onClick={() => noteMoveDialog.open(note)}>
            <MoveIcon />
          </IconButton>
          <IconButton
            label={{ value: 'Move note to trash' }}
            color={'white'}
            onClick={() => noteMoveToTrashDialog.open(note)}
          >
            <TrashIcon />
          </IconButton>
          <Divider vertical />
          <IconButton label={{ value: 'Undo' }} color={'white'} disabled={undoDisabled} onClick={handleUndo}>
            <UndoIcon />
          </IconButton>
          <IconButton label={{ value: 'Redo' }} color={'white'} disabled={redoDisabled} onClick={handleRedo}>
            <RedoIcon />
          </IconButton>
          <Divider vertical />
          {deviceType === 'PC' ? (
            <IconButton label={{ value: 'Editor and Preview' }} color={'white'} onClick={() => onOpenPreview('half')}>
              <VerticalSplitIcon />
            </IconButton>
          ) : (
            <></>
          )}
          <IconButton label={{ value: 'Preview' }} color={'white'} onClick={() => onOpenPreview('full')}>
            <PreviewIcon />
          </IconButton>
        </FlexRow>
        <FlexRow justify={'flex-end'}>
          <IconButton label={{ value: 'Open properties' }} color={'white'} onClick={onOpenProperties}>
            <SidebarIcon />
          </IconButton>
          <IconButton label={{ value: 'Close tab' }} color={'white'} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </FlexRow>
      </FlexRow>
    </AppBar>
  )
}
