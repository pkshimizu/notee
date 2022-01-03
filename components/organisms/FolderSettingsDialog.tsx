import FormDialog from '../molecules/feedback/FormDialog'
import { useCallback } from 'react'
import { Folder, updateFolder } from '../../store/notes'
import TextField from '../atoms/inputs/TextField'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type FolderSettingDialogProps = {
  open: boolean
  folder: Folder
  onClose: () => void
}

export default function FolderSettingsDialog({ open, folder, onClose }: FolderSettingDialogProps) {
  const schema = yup.object().shape({
    name: yup.string().max(30).required(),
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: folder.name,
    },
  })
  const dispatch = useDispatch()
  const handleClose = useCallback(() => {
    onClose()
    reset()
  }, [onClose, reset])
  const handleSaveFolderSettings = useCallback(
    async (data) => {
      await dispatch(updateFolder({ folder: folder, name: data.name }))
      onClose()
    },
    [dispatch, folder, onClose]
  )

  return (
    <FormDialog open={open} onSubmit={handleSubmit(handleSaveFolderSettings)} onClose={handleClose}>
      <TextField label={'フォルダ名'} register={register('name')} error={errors.name?.message} />
    </FormDialog>
  )
}
