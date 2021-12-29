import { ReactNode } from 'react'
import Dialog from '../../atoms/feedback/Dialog'
import Form from '../../atoms/display/Form'
import Button from '../../atoms/inputs/Button'

type FormDialogProps = {
  open: boolean
  title?: string
  submitLabel?: string
  closeLabel?: string
  children: ReactNode
  onSubmit: () => void
  onClose: () => void
}

export default function FormDialog({
  open,
  title,
  submitLabel = 'Submit',
  closeLabel = 'Close',
  children,
  onSubmit,
  onClose,
}: FormDialogProps) {
  return (
    <Dialog
      open={open}
      title={title}
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
      <Form>{children}</Form>
    </Dialog>
  )
}
