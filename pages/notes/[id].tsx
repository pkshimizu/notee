import type { NextPage } from 'next'
import WorkspaceLayout from '../../components/templates/WorkspaceLayout'
import NoteTree from '../../components/organisms/NoteTree'
import { useDispatch, useSelector } from 'react-redux'
import { foldersSelector, notesSelector, rootFolderSelector } from '../../store/notes'
import workspaceSlice, { activeItemIdSelector, openSideBarSelector } from '../../store/workspace'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import WorkspaceTabView from '../../components/organisms/WorkspaceTabView'
import WorkspaceAppBar from '../../components/organisms/WorkspaceAppBar'
import { FlexColumn, FlexRow } from '../../components/atoms/layout/Flex'
import { useFavoritesPage, useNotesPage } from '../../hooks/usePages'
import SearchField from '../../components/molecules/inputs/SearchField'
import { FavoriteIcon } from '../../components/atoms/display/Icons'
import Button from '../../components/atoms/inputs/Button'

const Workspace: NextPage = () => {
  const root = useSelector(rootFolderSelector)
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
  const activeItemId = useSelector(activeItemIdSelector)
  const openSideBar = useSelector(openSideBarSelector)
  const notesPage = useNotesPage()
  const favoritesPage = useFavoritesPage()
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  useEffect(() => {
    if (id === 'search') {
      dispatch(workspaceSlice.actions.openSearchResults())
      
      return
    }
    if (id === 'favorites') {
      dispatch(workspaceSlice.actions.openFavorites())
      
      return
    }
    const folder = folders.find((folder) => folder.id === id)
    if (folder) {
      dispatch(workspaceSlice.actions.open({ id: folder.id }))

      return
    }
    const note = notes.find((note) => note.id === id)
    if (note) {
      dispatch(workspaceSlice.actions.open({ id: note.id }))

      return
    }
    if (root) {
      dispatch(workspaceSlice.actions.open({ id: root.id }))

      return
    }
  }, [dispatch, id, folders, notes, root])
  useEffect(() => {
    if (activeItemId) {
      notesPage(activeItemId)
    }
  }, [notesPage, activeItemId])
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
        <FlexColumn space={0} noWrap>
          <SearchField />
          <FlexRow space={0} noGrow>
            <Button onClick={favoritesPage} icon={<FavoriteIcon />} variant={'text'}>
              Favorite
            </Button>
          </FlexRow>
          <NoteTree folder={root} activeId={activeItemId} onSelect={handleSelectItem} />
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
