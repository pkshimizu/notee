import TabView from '../atoms/navigation/TabView'
import { FavoriteIcon, FolderIcon, MenuIcon, NoteIcon, SearchIcon } from '../atoms/display/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { activeItemIdSelector, openItemsSelector } from '../../store/workspace/selectors'
import { useCallback, useEffect } from 'react'
import { Folder, Note } from '../../store/notes/models'
import IconButton from '../atoms/inputs/IconButton'
import { useItemsPage } from '../../hooks/usePages'
import { foldersSelector, notesSelector } from '../../store/notes/selectors'
import workspaceSlice, { WorkspaceItem } from '../../store/workspace'
import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'

type WorkspaceTabViewProps = {}

function makeTabs(items: WorkspaceItem[], folders: Folder[], notes: Note[]) {
  return items.map((item) => {
    switch (item.type) {
    case 'folder':
      const folder = folders.find((folder) => folder.id === item.id)

      return {
        value: item.id,
        label: folder?.name ?? '名前無し',
        icon: <FolderIcon key={item.id} />,
      }
    case 'note':
      const note = notes.find((note) => note.id === item.id)

      return {
        value: item.id,
        label: note?.title ?? '名前無し',
        icon: <NoteIcon key={item.id} />,
      }
    case 'search':
      return {
        value: item.id,
        label: 'Search Results',
        icon: <SearchIcon key={item.id} />,
      }
    case 'favorites':
      return {
        value: item.id,
        label: 'Favorites',
        icon: <FavoriteIcon key={item.id} />,
      }
    default:
      return {
        value: item.id,
        label: 'UnKnown',
      }
    }
  })
}

export default function WorkspaceTabView({}: WorkspaceTabViewProps) {
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
  const activeItemId = useSelector(activeItemIdSelector)
  const items = useSelector(openItemsSelector)
  const itemsPage = useItemsPage()
  const { close } = useWorkspaceTab()
  const dispatch = useDispatch()
  useEffect(() => {
    items.forEach((item) => {
      if (item.type === 'folder') {
        const folder = folders.find((folder) => folder.id === item.id)
        if (folder === undefined) {
          // 存在しないitemを閉じる
          close(item.id)
        }
      }
      if (item.type === 'note') {
        const note = notes.find((note) => note.id === item.id)
        if (note === undefined) {
          // 存在しないitemを閉じる
          close(item.id)
        }
      }
    })
  }, [items, folders, notes, close])
  const handleChangeTab = useCallback(
    (value: string) => {
      itemsPage(value)
    },
    [itemsPage]
  )
  const handleToggleSideBar = useCallback(() => {
    dispatch(workspaceSlice.actions.toggleSideBar())
  }, [dispatch])

  if (!activeItemId) {
    return <></>
  }

  return (
    <TabView
      leftItem={
        <IconButton onClick={handleToggleSideBar}>
          <MenuIcon />
        </IconButton>
      }
      value={activeItemId}
      tabs={makeTabs(items, folders, notes)}
      tabsOnly
      onChange={handleChangeTab}
    />
  )
}
