import dayjs from 'dayjs'
import { useCallback } from 'react'
import { LabelText } from './useLocale'

export function useDay() {
  const dateTimeFormatter = useCallback((datetime: string): LabelText => {
    return { value: dayjs(datetime).format('YYYY-MM-DD HH:mm:ss'), plain: true }
  }, [])

  return {
    dateTimeFormatter,
  }
}
