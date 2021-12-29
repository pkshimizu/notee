import { deleteNote, Note } from '../../store/notes'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback } from 'react'
import Flex from '../atoms/layout/Flex'
import { FolderIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'

type NoteDeleteDialogProps = {
  open: boolean
  note: Note
  onClose: () => void
}

export default function NoteDeleteDialog({ open, note, onClose }: NoteDeleteDialogProps) {
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    dispatch(deleteNote({ note: note }))
    onClose()
  }, [dispatch, note, onClose])

  return (
    <ConfirmDialog open={open} onOk={handleOk} onCancel={onClose}>
      <Flex direction={'column'}>
        <Flex direction={'row'}>
          <FolderIcon />
          <Label>{note.title}</Label>
        </Flex>
        <Label>このノートを削除しますか？</Label>
      </Flex>
    </ConfirmDialog>
  )
}
