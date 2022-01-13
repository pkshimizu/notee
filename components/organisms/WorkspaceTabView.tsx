import TabView, { Tab } from '../atoms/navigation/TabView'
import { FolderIcon, MenuIcon, NoteIcon, SearchIcon } from '../atoms/display/Icons'
import { useDispatch, useSelector } from 'react-redux'
import workspaceSlice, { activeTabSelector, openSideBarSelector, tabsSelector } from '../../store/workspace'
import { useCallback } from 'react'
import { Folder, foldersSelector, Note, notesSelector, searchResultsSelector } from '../../store/notes'
import IconButton from '../atoms/inputs/IconButton'
import FolderTabPanel from './FolderTabPanel'
import NoteTabPanel from './NoteTabPanel'
import { useNotesPage } from '../../hooks/usePages'
import SearchResultsTabPanel from './SearchResultsTabPanel'

type WorkspaceTabViewProps = {}

function icon(tab: Tab, folder?: Folder, note?: Note) {
  if (folder) {
    return <FolderIcon key={tab.value} />
  }
  if (note) {
    return <NoteIcon key={tab.value} />
  }
  if (tab.value === 'search') {
    return <SearchIcon key={tab.value} />
  }

  return undefined
}

function label(tab: Tab, folder?: Folder, note?: Note) {
  if (folder) {
    return folder.name
  }
  if (note) {
    return note.title ?? '名前無し'
  }

  return tab.label
}

function makeTabs(tabs: Tab[], folders: Folder[], notes: Note[]) {
  return tabs.map((tab) => {
    const folder = folders.find((folder) => folder.id === tab.value)
    const note = notes.find((note) => note.id === tab.value)

    return {
      ...tab,
      label: label(tab, folder, note),
      icon: icon(tab, folder, note),
    }
  })
}

export default function WorkspaceTabView({}: WorkspaceTabViewProps) {
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
  const searchResults = useSelector(searchResultsSelector)
  const activeTab = useSelector(activeTabSelector)
  const tabs = useSelector(tabsSelector)
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
  if (!activeTab) {
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
      value={activeTab.value}
      tabs={makeTabs(tabs, folders, notes)}
      onChange={handleChangeTab}
    >
      {tabs.map((tab) => {
        const folder = folders.find((folder) => folder.id === tab.value)
        const note = notes.find((note) => note.id === tab.value)
        if (tab.value === 'search' && searchResults) {
          return <SearchResultsTabPanel key={tab.value} value={tab.value} notes={notes} noteIds={searchResults.notes} />
        }
        if (folder) {
          return <FolderTabPanel folder={folder} key={folder.id} />
        }
        if (note) {
          return <NoteTabPanel note={note} key={note.id} />
        }

        return <></>
      })}
    </TabView>
  )
}
