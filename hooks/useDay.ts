import dayjs from 'dayjs'
import { useCallback } from 'react'
import { LabelText, useLocale } from './useLocale'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ja'
import 'dayjs/locale/en'

export function useDay() {
  const { locale } = useLocale()
  dayjs.extend(relativeTime)
  dayjs.locale(locale)
  const dateTimeFormatter = useCallback((datetime: string): LabelText => {
    return { value: dayjs(datetime).format('YYYY-MM-DD HH:mm:ss'), plain: true }
  }, [])
  const fromNow = useCallback((datetime: string): LabelText => {
    return { value: dayjs(datetime).fromNow(), plain: true }
  }, [])

  return {
    dateTimeFormatter,
    fromNow,
  }
}
