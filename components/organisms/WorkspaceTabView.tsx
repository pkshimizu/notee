import TabView from '../atoms/navigation/TabView'
import { FavoriteIcon, FolderIcon, MenuIcon, NoteIcon, SearchIcon } from '../atoms/display/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { activeItemIdSelector, openItemIdsSelector } from '../../store/workspace/selectors'
import { useCallback, useEffect } from 'react'
import { Folder, Note } from '../../store/notes/models'
import IconButton from '../atoms/inputs/IconButton'
import FolderTabPanel from './FolderTabPanel'
import NoteTabPanel from './NoteTabPanel'
import { useNotesPage } from '../../hooks/usePages'
import SearchResultsTabPanel from './SearchResultsTabPanel'
import FavoritesTabPanel from './FavoritesTabPanel'
import { foldersSelector, notesSelector } from '../../store/notes/selectors'
import workspaceSlice from '../../store/workspace'

type WorkspaceTabViewProps = {}

function icon(itemId: string, folder?: Folder, note?: Note) {
  if (folder) {
    return <FolderIcon key={itemId} />
  }
  if (note) {
    return <NoteIcon key={itemId} />
  }
  if (itemId === 'search') {
    return <SearchIcon key={itemId} />
  }
  if (itemId === 'favorites') {
    return <FavoriteIcon key={itemId} />
  }

  return undefined
}

function label(itemId: string, folder?: Folder, note?: Note) {
  if (folder) {
    return folder.name
  }
  if (note) {
    return note.title ?? '名前無し'
  }
  if (itemId === 'search') {
    return '検索結果'
  }
  if (itemId === 'favorites') {
    return 'お気に入り'
  }

  return undefined
}

function panel(itemId: string, notes: Note[], folder?: Folder, note?: Note) {
  if (itemId === 'search') {
    return <SearchResultsTabPanel key={itemId} value={itemId} />
  }
  if (itemId === 'favorites') {
    return <FavoritesTabPanel key={itemId} value={itemId} />
  }
  if (folder) {
    return <FolderTabPanel folder={folder} key={folder.id} />
  }
  if (note) {
    return <NoteTabPanel note={note} key={note.id} />
  }

  return undefined
}

function makeTabs(itemIds: string[], folders: Folder[], notes: Note[]) {
  return itemIds.map((itemId) => {
    const folder = folders.find((folder) => folder.id === itemId)
    const note = notes.find((note) => note.id === itemId)

    return {
      value: itemId,
      label: label(itemId, folder, note),
      icon: icon(itemId, folder, note),
      panel: panel(itemId, notes, folder, note),
    }
  })
}

export default function WorkspaceTabView({}: WorkspaceTabViewProps) {
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
  const activeItemId = useSelector(activeItemIdSelector)
  const itemIds = useSelector(openItemIdsSelector)
  const notesPage = useNotesPage()
  const dispatch = useDispatch()
  useEffect(() => {
    itemIds.forEach((itemId) => {
      const folder = folders.find((folder) => folder.id === itemId)
      const note = notes.find((note) => note.id === itemId)
      if (label(itemId, folder, note) === undefined) {
        // 存在しないitemを閉じる
        dispatch(workspaceSlice.actions.close({ id: itemId }))
      }
    })
  }, [itemIds, folders, notes, dispatch])
  const handleChangeTab = useCallback(
    (value: string) => {
      notesPage(value)
    },
    [notesPage]
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
      tabs={makeTabs(itemIds, folders, notes)}
      onChange={handleChangeTab}
    />
  )
}
