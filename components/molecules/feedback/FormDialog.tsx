import { ReactElement } from 'react'
import Dialog, { DialogWidth } from '../../atoms/feedback/Dialog'
import Form from '../../atoms/inputs/Form'
import Button from '../../atoms/inputs/Button'
import Label from '../../atoms/display/Label'

type FormDialogProps = {
  open: boolean
  title?: string
  submitLabel?: string
  closeLabel?: string
  width?: DialogWidth
  children: ReactElement
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
      title={<Label text={title} />}
      width={width}
      actions={
        <>
          <Button variant={'text'} onClick={onClose}>
            <Label text={closeLabel} />
          </Button>
          <Button variant={'text'} onClick={onSubmit}>
            <Label text={submitLabel} />
          </Button>
        </>
      }
      onClose={onClose}
    >
      <Form onSubmit={onSubmit}>{children}</Form>
    </Dialog>
  )
}
