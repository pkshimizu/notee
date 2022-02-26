import { Note } from '../../store/notes/models'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback } from 'react'
import { NoteIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import { moveNoteToTrash } from '../../store/notes/actions'
import NoteTitleLabel from '../molecules/display/NoteTitleLabel'

type NoteMoveToTrashDialogProps = {
  open: boolean
  note: Note
  onClose: () => void
}

export default function NoteMoveToTrashDialog({ open, note, onClose }: NoteMoveToTrashDialogProps) {
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    dispatch(moveNoteToTrash({ note: note }))
    onClose()
  }, [dispatch, note, onClose])

  return (
    <ConfirmDialog open={open} title={{ value: 'Move To Trash' }} onOk={handleOk} onCancel={onClose}>
      <FlexColumn>
        <FlexRow>
          <NoteIcon />
          <NoteTitleLabel note={note} />
        </FlexRow>
        <Label text={{ value: 'Do you want to move this note to Trash?' }} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
