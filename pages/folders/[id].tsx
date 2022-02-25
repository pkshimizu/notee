import { useDispatch, useSelector } from 'react-redux'
import FolderTabPanel from '../../components/organisms/FolderTabPanel'
import WorkspaceLayout from '../../components/templates/WorkspaceLayout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTitle } from '../../hooks/useTitle'
import workspaceSlice from '../../store/workspace'
import NotesSelectors from "../../store/notes/selectors";

export default function Folder() {
  const folders = useSelector(NotesSelectors.folders)
  const router = useRouter()
  const { setTitle } = useTitle()
  const dispatch = useDispatch()
  const { id } = router.query
  const folder = folders.find((folder) => folder.id === id)
  useEffect(() => {
    if (folder) {
      dispatch(workspaceSlice.actions.openFolder({ id: folder.id }))
      setTitle({ value: folder.name, plain: true })
    }
  }, [dispatch, folder, setTitle])
  if (folder) {
    return <FolderTabPanel folder={folder} />
  }

  return <></>
}

Folder.layout = WorkspaceLayout
Folder.login = 'required'
