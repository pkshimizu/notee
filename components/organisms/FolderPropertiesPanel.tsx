import { Folder, updateFolder } from '../../store/notes'
import TabView from '../atoms/navigation/TabView'
import { useCallback, useState } from 'react'
import { ApplyIcon, InfoIcon } from '../atoms/display/Icons'
import TabPanel from '../atoms/navigation/TabPanel'
import Margin from '../atoms/layout/Margin'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import TextField from '../atoms/inputs/TextField'
import IconButton from '../atoms/inputs/IconButton'
import Form from '../atoms/display/Form'

type FolderPropertiesPanel = {
  folder: Folder
}

export default function FolderPropertiesPanel({ folder }: FolderPropertiesPanel) {
  const schema = yup.object().shape({
    name: yup.string().max(30).required(),
  })

  const [tab, setTab] = useState('info')
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: folder.name,
    },
  })
  const dispatch = useDispatch()
  const handleSaveFolderSettings = useCallback(
    async (data) => {
      await dispatch(updateFolder({ folder: folder, name: data.name }))
    },
    [dispatch, folder]
  )

  return (
    <TabView
      value={tab}
      tabs={[{ value: 'info', icon: <InfoIcon /> }]}
      variant={'fullWidth'}
      onChange={(value) => setTab(value)}
    >
      <TabPanel value={'info'}>
        <Margin top={2} bottom={2} left={1} right={1}>
          <FlexColumn>
            <Form>
              <FlexRow justify={'flex-end'}>
                <TextField label={'フォルダ名'} register={register('name')} error={errors.name?.message} size={'sm'} />
                <IconButton onClick={handleSubmit(handleSaveFolderSettings)}>
                  <ApplyIcon />
                </IconButton>
              </FlexRow>
            </Form>
          </FlexColumn>
        </Margin>
      </TabPanel>
    </TabView>
  )
}