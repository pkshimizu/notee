import { useCallback } from 'react'
import { useRouter } from 'next/router'

export const usePath = () => {
  const router = useRouter()
  return {
    current: useCallback(() => router.asPath, [router]),
    root: useCallback(() => '/', []),
    notes: useCallback((noteId) => `/notes/${noteId}`, []),
    folders: useCallback((folderId) => `/folders/${folderId}`, []),
    login: useCallback(() => '/login', []),
    search: useCallback(() => '/search', []),
    favorites: useCallback(() => '/favorites', []),
    trash: useCallback(() => '/trash', []),
    settingsProfile: useCallback(() => `/settings/profile`, []),
    settingsEditor: useCallback(() => '/settings/editor', []),
  }
}
