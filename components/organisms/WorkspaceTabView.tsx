import TabView from '../atoms/navigation/TabView'
import { TrashIcon, FavoriteIcon, FolderIcon, MenuIcon, NoteIcon, SearchIcon, LogIcon } from '../atoms/display/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import IconButton from '../atoms/inputs/IconButton'
import { useItemsPage } from '../../hooks/usePages'
import workspaceSlice from '../../store/workspace'
import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'
import { useNote } from '../../hooks/useNote'
import NotesSelectors from '../../store/notes/selectors'
import WorkspaceSelectors from '../../store/workspace/selectors'

type WorkspaceTabViewProps = {}

export default function WorkspaceTabView({}: WorkspaceTabViewProps) {
  const folders = useSelector(NotesSelectors.folders)
  const notes = useSelector(NotesSelectors.notes)
  const activeItemId = useSelector(WorkspaceSelectors.activeItemId)
  const items = useSelector(WorkspaceSelectors.openItems)
  const itemsPage = useItemsPage()
  const { close } = useWorkspaceTab()
  const { title } = useNote()
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
        <IconButton label={{ value: 'Open side bar' }} onClick={handleToggleSideBar}>
          <MenuIcon />
        </IconButton>
      }
      value={activeItemId}
      tabs={items.map((item) => {
        switch (item.type) {
        case 'folder':
          const folder = folders.find((folder) => folder.id === item.id)

          return {
            value: item.id,
            label: { value: folder?.name, defaultValue: 'No Name', plain: true },
            icon: <FolderIcon key={item.id} />,
            plain: true,
          }
        case 'note':
          const note = notes.find((note) => note.id === item.id)

          return {
            value: item.id,
            label: title(note),
            icon: <NoteIcon key={item.id} />,
            plain: true,
          }
        case 'search':
          return {
            value: item.id,
            label: { value: 'Search Results' },
            icon: <SearchIcon key={item.id} />,
          }
        case 'favorites':
          return {
            value: item.id,
            label: { value: 'Favorites' },
            icon: <FavoriteIcon key={item.id} />,
          }
        case 'recent':
          return {
            value: item.id,
            label: { value: 'Recent' },
            icon: <LogIcon key={item.id} />,
          }
        case 'trash':
          return {
            value: item.id,
            label: { value: 'Trash' },
            icon: <TrashIcon key={item.id} />,
          }
        default:
          return {
            value: item.id,
            label: { value: 'UnKnown' },
          }
        }
      })}
      tabsOnly
      onChange={handleChangeTab}
    />
  )
}
