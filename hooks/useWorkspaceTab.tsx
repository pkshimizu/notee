import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useItemsPage, useRootPage } from './usePages'
import workspaceSlice from '../store/workspace'
import WorkspaceSelectors from '../store/workspace/selectors'

export const useWorkspaceTab = () => {
  const items = useSelector(WorkspaceSelectors.openItems)
  const rootPage = useRootPage()
  const dispatch = useDispatch()
  const itemsPage = useItemsPage()

  const close = useCallback(
    async (id: string) => {
      const itemIds = items.map((item) => item.id)
      const index = itemIds.indexOf(id)
      if (index < 0) {
        return
      }
      if (items.length === 1) {
        await rootPage()
        dispatch(workspaceSlice.actions.close({ id: id }))
        return
      }
      await itemsPage(index === 0 ? itemIds[1] : itemIds[index - 1])
      dispatch(workspaceSlice.actions.close({ id: id }))
    },
    [items, rootPage, itemsPage]
  )
  const closeSearch = useCallback(async () => {
    await close('search')
  }, [close])
  const closeFavorites = useCallback(async () => {
    await close('favorites')
  }, [close])
  const closeRecent = useCallback(async () => {
    await close('recent')
  }, [close])
  const closeTrash = useCallback(async () => {
    await close('trash')
  }, [close])
  return {
    close,
    closeSearch,
    closeFavorites,
    closeRecent,
    closeTrash,
  }
}
