import TabView from '../atoms/navigation/TabView'
import { FolderIcon, MenuIcon, NoteIcon, SearchIcon } from '../atoms/display/Icons'
import { useDispatch, useSelector } from 'react-redux'
import workspaceSlice, { activeItemIdSelector, openSideBarSelector, openItemIdsSelector } from '../../store/workspace'
import { useCallback } from 'react'
import { Folder, foldersSelector, Note, notesSelector, searchResultsSelector } from '../../store/notes'
import IconButton from '../atoms/inputs/IconButton'
import FolderTabPanel from './FolderTabPanel'
import NoteTabPanel from './NoteTabPanel'
import { useNotesPage } from '../../hooks/usePages'
import SearchResultsTabPanel from './SearchResultsTabPanel'

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

  return itemId
}

function panel(itemId: string, notes: Note[], folder?: Folder, note?: Note, searchResultNotes?: string[]) {
  if (itemId === 'search' && searchResultNotes) {
    return <SearchResultsTabPanel key={itemId} value={itemId} notes={notes} noteIds={searchResultNotes} />
  }
  if (folder) {
    return <FolderTabPanel folder={folder} key={folder.id} />
  }
  if (note) {
    return <NoteTabPanel note={note} key={note.id} />
  }

  return <></>
}

function makeTabs(itemIds: string[], folders: Folder[], notes: Note[], searchResultNotes?: string[]) {
  return itemIds.map((itemId) => {
    const folder = folders.find((folder) => folder.id === itemId)
    const note = notes.find((note) => note.id === itemId)

    return {
      value: itemId,
      label: label(itemId, folder, note),
      icon: icon(itemId, folder, note),
      panel: panel(itemId, notes, folder, note, searchResultNotes),
    }
  })
}

export default function WorkspaceTabView({}: WorkspaceTabViewProps) {
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
  const searchResults = useSelector(searchResultsSelector)
  const activeItemId = useSelector(activeItemIdSelector)
  const itemIds = useSelector(openItemIdsSelector)
  const openSideBar = useSelector(openSideBarSelector)
  const notesPage = useNotesPage()
  const dispatch = useDispatch()
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
        !openSideBar && (
          <IconButton onClick={handleToggleSideBar}>
            <MenuIcon />
          </IconButton>
        )
      }
      value={activeItemId}
      tabs={makeTabs(itemIds, folders, notes, searchResults?.notes)}
      onChange={handleChangeTab}
    />
  )
}
