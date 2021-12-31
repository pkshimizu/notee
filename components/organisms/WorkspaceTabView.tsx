import TabView from '../atoms/navigation/TabView'
import { FolderIcon, MenuIcon, NoteIcon } from '../atoms/display/Icons'
import { useDispatch, useSelector } from 'react-redux'
import workspaceSlice, { activeTabSelector, openSideBarSelector, tabsSelector } from '../../store/workspace'
import { useCallback } from 'react'
import { foldersSelector, notesSelector } from '../../store/notes'
import IconButton from '../atoms/inputs/IconButton'
import FolderTabPanel from './FolderTabPanel'
import NoteTabPanel from './NoteTabPanel'
import { useNotesPage } from '../../hooks/usePages'

type WorkspaceTabViewProps = {}

export default function WorkspaceTabView({}: WorkspaceTabViewProps) {
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
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
      tabs={tabs.map((tab) => {
        const folder = folders.find((folder) => folder.id === tab.value)
        const note = notes.find((note) => note.id === tab.value)

        return {
          ...tab,
          label: folder?.name || note?.title || '名前無し',
          icon: folder ? <FolderIcon key={tab.value} /> : <NoteIcon key={tab.value} />,
        }
      })}
      onChange={handleChangeTab}
    >
      {tabs.map((tab) => {
        const folder = folders.find((folder) => folder.id === tab.value)
        const note = notes.find((note) => note.id === tab.value)
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
