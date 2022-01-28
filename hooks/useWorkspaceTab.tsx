import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openItemsSelector } from '../store/workspace/selectors'
import { useItemsPage, useRootPage } from './usePages'
import workspaceSlice from '../store/workspace'

export const useWorkspaceTab = () => {
  const items = useSelector(openItemsSelector)
  const rootPage = useRootPage()
  const dispatch = useDispatch()
  const itemsPage = useItemsPage()

  const close = useCallback(
    (id: string) => {
      if (items.length === 1) {
        dispatch(workspaceSlice.actions.close({ id: id }))
        rootPage()
        return
      }
      const itemIds = items.map((item) => item.id)
      const index = itemIds.indexOf(id)
      if (index < 0) {
        return
      }
      itemsPage(index === 0 ? itemIds[1] : itemIds[index - 1])
      dispatch(workspaceSlice.actions.close({ id: id }))
    },
    [items, rootPage, itemsPage]
  )
  const closeSearch = useCallback(() => {
    close('search')
  }, [close])
  const closeFavorites = useCallback(() => {
    close('favorites')
  }, [close])
  return {
    close,
    closeSearch,
    closeFavorites,
  }
}
