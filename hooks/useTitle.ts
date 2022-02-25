import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import systemSlice from '../store/system'
import { LabelText, useLocale } from './useLocale'
import SystemSelectors from '../store/system/selectors'

export function useTitle() {
  const title = useSelector(SystemSelectors.title)
  const { t } = useLocale()
  const dispatch = useDispatch()
  const setTitle = useCallback(
    (title: LabelText) => {
      dispatch(systemSlice.actions.title({ title: t(title) }))
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
