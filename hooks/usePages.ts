import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { activeItemIdSelector } from '../store/workspace/selectors'
import { foldersSelector, notesSelector } from '../store/notes/selectors'
import { usePath } from './usePath'

export const useRootPage = () => {
  const router = useRouter()
  const { root } = usePath()
  return useCallback(() => {
    router.push(root())
  }, [])
}

export const useItemsPage = () => {
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
  const foldersPage = useFoldersPage()
  const notesPage = useNotesPage()
  const searchPage = useSearchPage()
  const favoritesPage = useFavoritesPage()
  const trashPage = useTrashPage()

  return useCallback(
    (id: string) => {
      if (id === 'search') {
        searchPage()
      } else if (id === 'favorites') {
        favoritesPage()
      } else if (id === 'trash') {
        trashPage()
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
  const { notes } = usePath()
  return useCallback((id: string) => {
    router.push(notes(id))
    return
  }, [])
}

export const useFoldersPage = () => {
  const router = useRouter()
  const { folders } = usePath()
  return useCallback((id: string) => {
    router.push(folders(id))
    return
  }, [])
}

export const useActiveNotesPage = () => {
  const activeId = useSelector(activeItemIdSelector)
  const itemsPage = useItemsPage()
  return useCallback(() => {
    if (activeId) {
      itemsPage(activeId)
    }
  }, [activeId])
}

export const useLoginPage = () => {
  const router = useRouter()
  const { login } = usePath()
  return useCallback(() => {
    router.push(login())
  }, [])
}

export const useSearchPage = () => {
  const router = useRouter()
  const { search } = usePath()
  return useCallback(() => {
    router.push(search())
  }, [])
}

export const useFavoritesPage = () => {
  const router = useRouter()
  const { favorites } = usePath()
  return useCallback(() => {
    router.push(favorites())
  }, [])
}

export const useTrashPage = () => {
  const router = useRouter()
  const { trash } = usePath()
  return useCallback(() => {
    router.push(trash())
  }, [])
}

export const useProfileSettingsPage = () => {
  const router = useRouter()
  const { settingsProfile } = usePath()
  return useCallback(() => {
    router.push(settingsProfile())
  }, [])
}
export const useEditorSettingsPage = () => {
  const router = useRouter()
  const { settingsEditor } = usePath()
  return useCallback(() => {
    router.push(settingsEditor())
  }, [])
}
