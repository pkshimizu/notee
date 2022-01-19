import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { activeItemIdSelector } from '../store/workspace/selectors'

export const useRootPage = () => {
  const router = useRouter()
  return useCallback(() => {
    router.push(`/`)
  }, [])
}

export const useNotesPage = (defaultId?: string) => {
  const router = useRouter()
  return useCallback(
    (id?: string) => {
      if (id) {
        router.push(`/notes/${id}`)
        return
      }
      router.push(`/notes/${defaultId}`)
    },
    [defaultId]
  )
}

export const useActiveNotesPage = () => {
  const router = useRouter()
  const activeId = useSelector(activeItemIdSelector)
  return useCallback(() => {
    router.push(`/notes/${activeId}`)
  }, [activeId])
}

export const useLoginPage = () => {
  const router = useRouter()
  return useCallback(() => {
    router.push(`/login`)
  }, [])
}

export const useSearchPage = () => {
  const router = useRouter()
  return useCallback(() => {
    router.push(`/notes/search`)
  }, [])
}

export const useFavoritesPage = () => {
  const router = useRouter()
  return useCallback(() => {
    router.push(`/notes/favorites`)
  }, [])
}

export const useProfileSettingsPage = () => {
  const router = useRouter()
  return useCallback(() => {
    router.push(`/settings/profile`)
  }, [])
}
export const useEditorSettingsPage = () => {
  const router = useRouter()
  return useCallback(() => {
    router.push(`/settings/editor`)
  }, [])
}
