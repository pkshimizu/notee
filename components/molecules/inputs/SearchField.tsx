import TextField from '../../atoms/inputs/TextField'
import { SearchIcon } from '../../atoms/display/Icons'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Form from '../../atoms/inputs/Form'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import notesSlice from '../../../store/notes'
import workspaceSlice from '../../../store/workspace'

type SearchFieldProps = {}

export default function SearchField({}: SearchFieldProps) {
  const schema = yup.object().shape({
    keyword: yup.string(),
  })
  const { handleSubmit, register } = useForm({ resolver: yupResolver(schema) })
  const dispatch = useDispatch()
  const handleSearch = useCallback(
    (data) => {
      dispatch(notesSlice.actions.searchNotes({ keyword: data.keyword }))
      dispatch(workspaceSlice.actions.openSearchResults())
    },
    [dispatch]
  )

  return (
    <Form onSubmit={handleSubmit(handleSearch)}>
      <TextField label={'Search'} icon={<SearchIcon />} register={register('keyword')} />
    </Form>
  )
}
