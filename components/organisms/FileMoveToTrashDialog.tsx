import { useFileMoveToTrashDialog } from '../../hooks/useDialogs'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import { FileIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import NotesActions from '../../store/notes/actions'
import { File } from '../../store/notes/models'

type FileMoveToTrashDialogProps = {
  file: File
}

export default function FileMoveToTrashDialog({ file }: FileMoveToTrashDialogProps) {
  const { state, close } = useFileMoveToTrashDialog()
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    dispatch(NotesActions.moveFileToTrash({ file }))
    close()
  }, [dispatch, file, close])

  return (
    <ConfirmDialog open={state !== undefined} title={{ value: 'Move To Trash' }} onOk={handleOk} onCancel={close}>
      <FlexColumn>
        <FlexRow>
          <FileIcon />
          <Label text={{ value: file?.name, plain: true }} />
        </FlexRow>
        <Label text={{ value: 'Do you want to move this file to Trash?' }} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
