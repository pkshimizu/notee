import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import NotesSelectors from '../store/notes/selectors'
import { usePath } from './usePath'
import WorkspaceSelectors from '../store/workspace/selectors'

export const useRootPage = () => {
  const router = useRouter()
  const { root } = usePath()
  return useCallback(async () => {
    await router.push(root())
  }, [])
}

export const useItemsPage = () => {
  const folders = useSelector(NotesSelectors.folders)
  const notes = useSelector(NotesSelectors.notes)
  const foldersPage = useFoldersPage()
  const notesPage = useNotesPage()
  const searchPage = useSearchPage()
  const favoritesPage = useFavoritesPage()
  const recentPage = useRecentPage()
  const trashPage = useTrashPage()

  return useCallback(
    async (id: string) => {
      if (id === 'search') {
        await searchPage()
      } else if (id === 'favorites') {
        await favoritesPage()
      } else if (id === 'recent') {
        await recentPage()
      } else if (id === 'trash') {
        await trashPage()
      } else if (folders.find((folder) => folder.id === id)) {
        await foldersPage(id)
      } else if (notes.find((note) => note.id === id)) {
        await notesPage(id)
      }
    },
    [folders, notes, foldersPage, notesPage]
  )
}

export const useNotesPage = () => {
  const router = useRouter()
  const { notes } = usePath()
  return useCallback(async (id: string) => {
    await router.push(notes(id))
  }, [])
}

export const useFoldersPage = () => {
  const router = useRouter()
  const { folders } = usePath()
  return useCallback(async (id: string) => {
    await router.push(folders(id))
  }, [])
}

export const useActiveNotesPage = () => {
  const activeId = useSelector(WorkspaceSelectors.activeItemId)
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
  return useCallback(async () => {
    await router.push(login())
  }, [])
}

export const useSearchPage = () => {
  const router = useRouter()
  const { search } = usePath()
  return useCallback(async () => {
    await router.push(search())
  }, [])
}

export const useFavoritesPage = () => {
  const router = useRouter()
  const { favorites } = usePath()
  return useCallback(async () => {
    await router.push(favorites())
  }, [])
}

export const useRecentPage = () => {
  const router = useRouter()
  const { recent } = usePath()
  return useCallback(async () => {
    await router.push(recent())
  }, [])
}

export const useTrashPage = () => {
  const router = useRouter()
  const { trash } = usePath()
  return useCallback(async () => {
    await router.push(trash())
  }, [])
}

export const useProfileSettingsPage = () => {
  const router = useRouter()
  const { settingsProfile } = usePath()
  return useCallback(async () => {
    await router.push(settingsProfile())
  }, [])
}

export const useEditorSettingsPage = () => {
  const router = useRouter()
  const { settingsEditor } = usePath()
  return useCallback(async () => {
    await router.push(settingsEditor())
  }, [])
}
