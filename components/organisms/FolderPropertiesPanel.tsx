import { Folder } from '../../store/notes/models'
import TabView from '../atoms/navigation/TabView'
import { useCallback, useState } from 'react'
import { ApplyIcon, InfoIcon } from '../atoms/display/Icons'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import TextField from '../atoms/inputs/TextField'
import Form from '../atoms/inputs/Form'
import Button from '../atoms/inputs/Button'
import { updateFolder } from '../../store/notes/actions'
import Label from '../atoms/display/Label'

type FolderPropertiesPanelProps = {
  folder: Folder
}

export default function FolderPropertiesPanel({ folder }: FolderPropertiesPanelProps) {
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
      tabs={[
        {
          value: 'info',
          icon: <InfoIcon />,
          panel: (
            <FlexColumn pt={2} pl={1} pr={1} pb={2}>
              <Form onSubmit={handleSubmit(handleSaveFolderSettings)}>
                <FlexRow justify={'flex-end'} space={0}>
                  <TextField
                    label={'Folder Name'}
                    readonly={folder.folderId === undefined}
                    register={register('name')}
                    error={errors.name?.message}
                  />
                  <Button
                    icon={<ApplyIcon />}
                    variant={'text'}
                    onClick={() => handleSubmit(handleSaveFolderSettings)()}
                  >
                    <Label text={'Change'} />
                  </Button>
                </FlexRow>
              </Form>
            </FlexColumn>
          ),
        },
      ]}
      variant={'fullWidth'}
      onChange={(value) => setTab(value)}
    />
  )
}
