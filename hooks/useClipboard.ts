import { useCallback } from 'react'

export default function useClipboard() {
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
  }, [])

  return {
    copy,
  }
}
