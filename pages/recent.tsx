import { useTitle } from '../hooks/useTitle'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import workspaceSlice from '../store/workspace'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'
import RecentTabPanel from '../components/organisms/RecentTabPanel'

export default function Recent() {
  const { setTitle } = useTitle()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(workspaceSlice.actions.openRecent())
    setTitle({ value: 'Recent' })
  }, [dispatch, setTitle])

  return <RecentTabPanel />
}

Recent.layout = WorkspaceLayout
Recent.login = 'required'
