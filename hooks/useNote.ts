import { useCallback } from 'react'
import { Note } from '../store/notes/models'
import { LabelText, useLocale } from './useLocale'

export const useNote = (note?: Note) => {
  const { t } = useLocale()
  const title = useCallback(
    (targetNote?: Note): LabelText => {
      if (targetNote && targetNote.content.length > 0) {
        const line = targetNote.content.split('\n')[0]
        return { value: line, truncate: 30, plain: true, defaultValue: 'No Name' }
      }
      if (note && note.content.length > 0) {
        const line = note.content.split('\n')[0]
        return { value: line, truncate: 30, plain: true, defaultValue: 'No Name' }
      }
      return { truncate: 30, plain: true, defaultValue: 'No Name' }
    },
    [note, t]
  )
  return {
    title,
  }
}
