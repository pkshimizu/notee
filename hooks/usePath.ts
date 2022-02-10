import { useCallback } from 'react'

export const usePath = () => {
  return {
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
