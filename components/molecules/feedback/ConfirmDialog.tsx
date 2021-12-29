import { ReactNode } from 'react'
import Dialog from '../../atoms/feedback/Dialog'
import Button from '../../atoms/inputs/Button'

type ConfirmDialogProps = {
  open: boolean
  title?: string
  okLabel?: string
  cancelLabel?: string
  children: ReactNode
  onOk: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title,
  okLabel = 'OK',
  cancelLabel = 'Cancel',
  children,
  onOk,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      title={title}
      actions={
        <>
          <Button variant={'text'} onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={'text'} onClick={onOk}>
            {okLabel}
          </Button>
        </>
      }
      onClose={onCancel}
    >
      {children}
    </Dialog>
  )
}
