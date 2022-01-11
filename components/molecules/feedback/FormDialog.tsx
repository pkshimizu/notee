import { ReactNode } from 'react'
import Dialog, { DialogWidth } from '../../atoms/feedback/Dialog'
import Form from '../../atoms/inputs/Form'
import Button from '../../atoms/inputs/Button'

type FormDialogProps = {
  open: boolean
  title?: string
  submitLabel?: string
  closeLabel?: string
  width?: DialogWidth
  children: ReactNode
  onSubmit: () => void
  onClose: () => void
}

export default function FormDialog({
  open,
  title,
  submitLabel = 'Submit',
  closeLabel = 'Close',
  width,
  children,
  onSubmit,
  onClose,
}: FormDialogProps) {
  return (
    <Dialog
      open={open}
      title={title}
      width={width}
      actions={
        <>
          <Button variant={'text'} onClick={onClose}>
            {closeLabel}
          </Button>
          <Button variant={'text'} onClick={onSubmit}>
            {submitLabel}
          </Button>
        </>
      }
      onClose={onClose}
    >
      <Form onSubmit={onSubmit}>{children}</Form>
    </Dialog>
  )
}
