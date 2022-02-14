import { ReactElement } from 'react'
import Dialog, { DialogWidth } from '../../atoms/feedback/Dialog'
import Button from '../../atoms/inputs/Button'
import Label from '../../atoms/display/Label'

type ConfirmDialogProps = {
  open: boolean
  title?: string
  okLabel?: string
  cancelLabel?: string
  width?: DialogWidth
  children: ReactElement
  onOk: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title,
  okLabel = 'OK',
  cancelLabel = 'Cancel',
  width,
  children,
  onOk,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      title={<Label text={title} />}
      width={width}
      actions={
        <>
          <Button variant={'text'} onClick={onCancel}>
            <Label text={cancelLabel} />
          </Button>
          <Button variant={'text'} onClick={onOk}>
            <Label text={okLabel} />
          </Button>
        </>
      }
      onClose={onCancel}
    >
      {children}
    </Dialog>
  )
}
