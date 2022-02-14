import { useCallback } from 'react'
import { Note } from '../store/notes/models'
import { useLocale } from './useLocale'

export const useNote = (note?: Note) => {
  const title = useCallback(
    (targetNote?: Note) => {
      if (targetNote && targetNote.content.length > 0) {
        const line = targetNote.content.split('\n')[0]
        if (line.length > 0) {
          return line
        }
      }
      if (note && note.content.length > 0) {
        const line = note.content.split('\n')[0]
        if (line.length > 0) {
          return line
        }
      }
      const { t } = useLocale()
      return t('No Name')
    },
    [note]
  )
  return {
    title,
  }
}
