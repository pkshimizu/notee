import ConfirmDialog from '../molecules/feedback/ConfirmDialog'
import { useCallback } from 'react'
import { FolderIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import { useDispatch } from 'react-redux'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import NotesActions from '../../store/notes/actions'
import { FileMeta } from '../../store/notes/models'
import { useFileDeleteDialog } from '../../hooks/useDialogs'

type FileDeleteDialogProps = {
  file: FileMeta
}

export default function FileDeleteDialog({ file }: FileDeleteDialogProps) {
  const { state, close } = useFileDeleteDialog()
  const dispatch = useDispatch()
  const handleOk = useCallback(async () => {
    await dispatch(NotesActions.deleteFile({ file: file }))
  }, [dispatch, file])

  return (
    <ConfirmDialog open={state !== undefined} title={{ value: 'Delete' }} onOk={handleOk} onCancel={close}>
      <FlexColumn>
        <FlexRow>
          <FolderIcon />
          <Label text={{ value: file.name, plain: true }} />
        </FlexRow>
        <Label text={{ value: 'Do you want to delete this file?' }} />
        <Label text={{ value: 'This operation is irreversible.' }} />
      </FlexColumn>
    </ConfirmDialog>
  )
}
