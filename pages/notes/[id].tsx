import WorkspaceLayout from '../../components/templates/WorkspaceLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import WorkspaceTabView from '../../components/organisms/WorkspaceTabView'
import { useNotesPage } from '../../hooks/usePages'
import { foldersSelector, notesSelector, rootFolderSelector } from '../../store/notes/selectors'
import { activeItemIdSelector } from '../../store/workspace/selectors'
import workspaceSlice from '../../store/workspace'
import { useTitle } from '../../hooks/useTitle'

export default function Workspace() {
  const root = useSelector(rootFolderSelector)
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
  const activeItemId = useSelector(activeItemIdSelector)
  const { setTitle } = useTitle()
  const notesPage = useNotesPage()
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  useEffect(() => {
    if (id === 'search') {
      dispatch(workspaceSlice.actions.openSearchResults())
      setTitle('検索結果')

      return
    }
    if (id === 'favorites') {
      dispatch(workspaceSlice.actions.openFavorites())
      setTitle('お気に入り')

      return
    }
    const folder = folders.find((folder) => folder.id === id)
    if (folder) {
      dispatch(workspaceSlice.actions.open({ id: folder.id }))
      setTitle(folder.name)

      return
    }
    const note = notes.find((note) => note.id === id)
    if (note) {
      dispatch(workspaceSlice.actions.open({ id: note.id }))
      setTitle(note.title)

      return
    }
    if (root) {
      dispatch(workspaceSlice.actions.open({ id: root.id }))

      return
    }
  }, [dispatch, id, folders, notes, root, setTitle])
  useEffect(() => {
    if (activeItemId) {
      notesPage(activeItemId)
    }
  }, [notesPage, activeItemId])

  return <WorkspaceTabView />
}

Workspace.layout = WorkspaceLayout
