import { useDispatch, useSelector } from 'react-redux'
import { titleSelector } from '../store/system/selectors'
import { useCallback } from 'react'
import systemSlice from '../store/system'

export function useTitle() {
  const title = useSelector(titleSelector)
  const dispatch = useDispatch()
  const setTitle = useCallback(
    (title: string) => {
      dispatch(systemSlice.actions.title({ title }))
    },
    [dispatch]
  )
  const resetTitle = useCallback(() => {
    dispatch(systemSlice.actions.title({ title: undefined }))
  }, [dispatch])
  return {
    title,
    setTitle,
    resetTitle,
  }
}
