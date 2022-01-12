import type { NextPage } from 'next'
import WorkspaceLayout from '../../components/templates/WorkspaceLayout'
import NoteTree from '../../components/organisms/NoteTree'
import { useDispatch, useSelector } from 'react-redux'
import { foldersSelector, notesSelector, rootFolderSelector } from '../../store/notes'
import workspaceSlice, { activeTabSelector, openSideBarSelector, tabsSelector } from '../../store/workspace'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import WorkspaceTabView from '../../components/organisms/WorkspaceTabView'
import WorkspaceAppBar from '../../components/organisms/WorkspaceAppBar'
import { FlexColumn } from '../../components/atoms/layout/Flex'
import { useNotesPage } from '../../hooks/usePages'
import SearchField from '../../components/molecules/inputs/SearchField'

const Workspace: NextPage = () => {
  const root = useSelector(rootFolderSelector)
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
  const activeTab = useSelector(activeTabSelector)
  const openSideBar = useSelector(openSideBarSelector)
  const notesPage = useNotesPage()
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

      return
    }
    if (root) {
      dispatch(workspaceSlice.actions.open({ tab: { value: root.id, label: root.name } }))

      return
    }
  }, [dispatch, id, folders, notes, root])
  useEffect(() => {
    if (activeTab) {
      notesPage(activeTab.value)
    }
  }, [notesPage, activeTab])
  const handleToggleSideBar = useCallback(() => {
    dispatch(workspaceSlice.actions.toggleSideBar())
  }, [dispatch])
  const handleSelectItem = useCallback(
    (id) => {
      notesPage(id)
    },
    [notesPage]
  )

  return (
    <WorkspaceLayout
      appbar={<WorkspaceAppBar />}
      sidebar={
        <FlexColumn space={0}>
          <SearchField />
          <NoteTree folder={root} activeId={activeTab?.value} onSelect={handleSelectItem} />
        </FlexColumn>
      }
      openSideBar={openSideBar}
      onCloseSideBar={handleToggleSideBar}
    >
      <FlexColumn height={'100vh'} space={0}>
        <WorkspaceTabView />
      </FlexColumn>
    </WorkspaceLayout>
  )
}

export default Workspace
