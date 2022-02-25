import Dialog, { DialogWidth } from '../../atoms/feedback/Dialog'
import Form from '../../atoms/inputs/Form'
import Button from '../../atoms/inputs/Button'
import Label from '../../atoms/display/Label'
import { LabelText } from '../../../hooks/useLocale'
import { Component } from '../../../types/react'

type FormDialogProps = {
  open: boolean
  title?: LabelText
  submitLabel?: LabelText
  closeLabel?: LabelText
  width?: DialogWidth
  children: Component
  onSubmit: () => void
  onClose: () => void
}

export default function FormDialog({
  open,
  title,
  submitLabel = { value: 'Submit' },
  closeLabel = { value: 'Close' },
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
