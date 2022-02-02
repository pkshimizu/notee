import { useTitle } from '../hooks/useTitle'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import workspaceSlice from '../store/workspace'
import TrashTabPanel from '../components/organisms/TrashTabPanel'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'

export default function Trash() {
  const { setTitle } = useTitle()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(workspaceSlice.actions.openTrash())
    setTitle('Trash')
  }, [dispatch, setTitle])

  return <TrashTabPanel />
}

Trash.layout = WorkspaceLayout
Trash.login = 'required'
