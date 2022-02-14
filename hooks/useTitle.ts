import { useDispatch, useSelector } from 'react-redux'
import { titleSelector } from '../store/system/selectors'
import { useCallback } from 'react'
import systemSlice from '../store/system'
import { useLocale } from './useLocale'

export function useTitle() {
  const title = useSelector(titleSelector)
  const { t } = useLocale()
  const dispatch = useDispatch()
  const setTitle = useCallback(
    (title: string, plain: boolean = false) => {
      const translatedTitle = plain ? title : t(title)
      dispatch(systemSlice.actions.title({ title: translatedTitle }))
    },
    [dispatch, t]
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
