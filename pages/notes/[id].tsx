import type { NextPage } from 'next'
import WorkspaceLayout from '../../components/templates/WorkspaceLayout'
import NoteTree from '../../components/organisms/NoteTree'
import { useDispatch, useSelector } from 'react-redux'
import { foldersSelector, notesSelector, rootFolderSelector } from '../../store/notes'
import workspaceSlice, { activeTabSelector, openSideBarSelector, tabsSelector } from '../../store/workspace'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import WorkspaceTabView from '../../components/organisms/WorkspaceTabView'
import WorkspaceAppBar from '../../components/organisms/WorkspaceAppBar'

const Workspace: NextPage = () => {
  const root = useSelector(rootFolderSelector)
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
  const openSideBar = useSelector(openSideBarSelector)
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  useEffect(() => {
    const folder = folders.find((folder) => folder.id === id)
    if (folder) {
      dispatch(workspaceSlice.actions.open({ tab: { value: folder.id, label: folder.name } }))

      return
    }
    const note = notes.find((note) => note.id === id)
    if (note) {
      dispatch(workspaceSlice.actions.open({ tab: { value: note.id, label: note.title } }))
    }
  }, [dispatch, id, folders, notes])
  const handleToggleSideBar = useCallback(() => {
    dispatch(workspaceSlice.actions.toggleSideBar())
  }, [dispatch])

  return (
    <WorkspaceLayout
      appbar={<WorkspaceAppBar />}
      sidebar={<NoteTree folder={root} />}
      openSideBar={openSideBar}
      onCloseSideBar={handleToggleSideBar}
    >
      <WorkspaceTabView />
    </WorkspaceLayout>
  )
}

export default Workspace
