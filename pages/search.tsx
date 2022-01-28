import { useDispatch } from 'react-redux'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'
import { useEffect } from 'react'
import { useTitle } from '../hooks/useTitle'
import workspaceSlice from '../store/workspace'
import SearchResultsTabPanel from '../components/organisms/SearchResultsTabPanel'

export default function Search() {
  const { setTitle } = useTitle()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(workspaceSlice.actions.openSearchResults())
    setTitle('Search')
  }, [dispatch, setTitle])

  return <SearchResultsTabPanel />
}

Search.layout = WorkspaceLayout
