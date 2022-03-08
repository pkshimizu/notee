import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback } from 'react'
import { NoteIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import NotesActions from '../../store/notes/actions'
import NoteTitleLabel from '../molecules/display/NoteTitleLabel'
import { useNoteMoveToTrashDialog } from '../../hooks/useDialogs'

export default function NoteMoveToTrashDialog() {
  const { state, close } = useNoteMoveToTrashDialog()
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    if (state) {
      dispatch(NotesActions.moveNoteToTrash({ note: state.note }))
    }
    close()
  }, [dispatch, state, close])

  return (
    <ConfirmDialog open={state !== undefined} title={{ value: 'Move To Trash' }} onOk={handleOk} onCancel={close}>
      <FlexColumn>
        <FlexRow>
          <NoteIcon />
          {state && <NoteTitleLabel note={state.note} />}
        </FlexRow>
        <Label text={{ value: 'Do you want to move this note to Trash?' }} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
