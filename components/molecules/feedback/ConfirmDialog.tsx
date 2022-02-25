import Dialog, { DialogWidth } from '../../atoms/feedback/Dialog'
import Button from '../../atoms/inputs/Button'
import Label from '../../atoms/display/Label'
import { LabelText } from '../../../hooks/useLocale'
import { Component } from '../../../types/react'

type ConfirmDialogProps = {
  open: boolean
  title?: LabelText
  okLabel?: LabelText
  cancelLabel?: LabelText
  width?: DialogWidth
  children: Component
  onOk: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title,
  okLabel = { value: 'OK' },
  cancelLabel = { value: 'Cancel' },
  width,
  children,
  onOk,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      title={title}
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
