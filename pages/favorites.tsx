import { useDispatch } from 'react-redux'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'
import { useEffect } from 'react'
import { useTitle } from '../hooks/useTitle'
import FavoritesTabPanel from '../components/organisms/FavoritesTabPanel'
import workspaceSlice from '../store/workspace'

export default function Favorites() {
  const { setTitle } = useTitle()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(workspaceSlice.actions.openFavorites())
    setTitle('Favorites')
  }, [dispatch, setTitle])

  return <FavoritesTabPanel />
}

Favorites.layout = WorkspaceLayout
