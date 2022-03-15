import FormDialog from '../molecules/feedback/FormDialog'
import { useCallback } from 'react'
import TextField from '../atoms/inputs/TextField'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import NotesActions from '../../store/notes/actions'
import { useFolderCreateDialog } from '../../hooks/useDialogs'
import { Folder } from '../../store/notes/models'

type FolderCreateDialogProps = {
  folder: Folder
}

export default function FolderCreateDialog({ folder }: FolderCreateDialogProps) {
  const { state, close } = useFolderCreateDialog()
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
  })
  const dispatch = useDispatch()
  const handleClose = useCallback(() => {
    close()
    reset()
  }, [close, reset])
  const handleSaveFolderSettings = useCallback(
    async (data) => {
      await dispatch(NotesActions.createFolder({ name: data.name, parentFolder: folder }))
      close()
    },
    [dispatch, folder, close]
  )

  return (
    <FormDialog
      open={state !== undefined}
      title={{ value: 'Create folder' }}
      width={'xs'}
      onSubmit={handleSubmit(handleSaveFolderSettings)}
      onClose={handleClose}
    >
      <TextField label={{ value: 'Folder Name' }} focused register={register('name')} error={errors.name?.message} />
    </FormDialog>
  )
}
