import { Folder, Note } from '../../store/notes/models'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { Dispatch, useCallback } from 'react'
import { FolderIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import { deleteFolder, deleteNote } from '../../store/notes/actions'

type NoteDeleteDialogProps = {
  open: boolean
  note: Note
  onClose: () => void
}

const deleteFolderItems = (dispatch: Dispatch<any>, folder: Folder) => {
  folder.folders.forEach((subFolder) => deleteFolderItems(dispatch, subFolder))
  folder.notes.forEach((note) => dispatch(deleteNote({ note: note })))
  dispatch(deleteFolder({ folder: folder }))
}

export default function NoteDeleteDialog({ open, note, onClose }: NoteDeleteDialogProps) {
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    await dispatch(deleteNote({ note: note }))
    onClose()
  }, [dispatch, note, onClose])

  return (
    <ConfirmDialog open={open} title={'Delete'} onOk={handleOk} onCancel={onClose}>
      <FlexColumn>
        <FlexRow>
          <FolderIcon />
          <Label>{note.title}</Label>
        </FlexRow>
        <Label>Do you want to delete this note?</Label>
        <Label>This operation is irreversible.</Label>
      </FlexColumn>
    </ConfirmDialog>
  )
}
