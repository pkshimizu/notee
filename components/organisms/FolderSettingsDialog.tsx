import FormDialog from '../molecules/feedback/FormDialog'
import { useCallback, useState } from 'react'
import { Folder, updateFolder } from '../../store/notes'
import TextField from '../atoms/inputs/TextField'
import { useDispatch } from 'react-redux'

type FolderSettingDialogProps = {
  open: boolean
  folder: Folder
  onClose: () => void
}

export default function FolderSettingsDialog({ open, folder, onClose }: FolderSettingDialogProps) {
  const [name, setName] = useState(folder.name)
  const dispatch = useDispatch()
  const handleSaveFolderSettings = useCallback(async () => {
    await dispatch(updateFolder({ folder: folder, name: name }))
    onClose()
  }, [dispatch, folder, name, onClose])
  const handleChangeName = useCallback((value: string) => {
    setName(value)
  }, [])

  return (
    <FormDialog open={open} onSubmit={handleSaveFolderSettings} onClose={onClose}>
      <TextField
        label={'フォルダ名'}
        value={name}
        onChange={handleChangeName}
        validation={{ required: true, maxLength: 30 }}
      />
    </FormDialog>
  )
}
