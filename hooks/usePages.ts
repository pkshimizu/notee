import { useRouter } from 'next/router'
import { useCallback } from 'react'

export const useRootPage = () => {
  const router = useRouter()
  return useCallback(() => {
    router.push(`/`)
  }, [])
}

export const useNotesPage = () => {
  const router = useRouter()
  return useCallback((id: string) => {
    router.push(`/notes/${id}`)
  }, [])
}

export const useLoginPage = () => {
  const router = useRouter()
  return useCallback(() => {
    router.push(`/login`)
  }, [])
}
