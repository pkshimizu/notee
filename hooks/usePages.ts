import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { activeItemIdSelector } from '../store/workspace/selectors'
import { foldersSelector, notesSelector } from '../store/notes/selectors'

export const useRootPage = () => {
  const router = useRouter()
  return useCallback(() => {
    router.push(`/`)
  }, [])
}

export const useItemsPage = () => {
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
  const foldersPage = useFoldersPage()
  const notesPage = useNotesPage()
  const searchPage = useSearchPage()
  const favoritesPage = useFavoritesPage()

  return useCallback(
    (id: string) => {
      if (id === 'search') {
        searchPage()
      } else if (id === 'favorites') {
        favoritesPage()
      } else if (folders.find((folder) => folder.id === id)) {
        foldersPage(id)
      } else if (notes.find((note) => note.id === id)) {
        notesPage(id)
      }
    },
    [folders, notes, foldersPage, notesPage]
  )
}

export const useNotesPage = () => {
  const router = useRouter()
  return useCallback((id: string) => {
    router.push(`/notes/${id}`)
    return
  }, [])
}

export const useFoldersPage = () => {
  const router = useRouter()
  return useCallback((id: string) => {
    router.push(`/folders/${id}`)
    return
  }, [])
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
    router.push(`/search`)
  }, [])
}

export const useFavoritesPage = () => {
  const router = useRouter()
  return useCallback(() => {
    router.push(`/favorites`)
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
