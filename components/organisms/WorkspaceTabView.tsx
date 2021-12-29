import TabView from '../atoms/navigation/TabView'
import { FolderIcon, MenuIcon, NoteIcon } from '../atoms/display/Icons'
import TabPanel from '../atoms/navigation/TabPanel'
import { FlexColumn } from '../atoms/layout/Flex'
import FolderMenu from './FolderMenu'
import NoteMenu from './NoteMenu'
import { useDispatch, useSelector } from 'react-redux'
import workspaceSlice, { activeTabSelector, openSideBarSelector, tabsSelector } from '../../store/workspace'
import { useCallback, useContext } from 'react'
import { foldersSelector, notesSelector } from '../../store/notes'
import IconButton from '../atoms/inputs/IconButton'
import { Router } from '../systems/RouterProvider'

type WorkspaceTabViewProps = {}

export default function WorkspaceTabView({}: WorkspaceTabViewProps) {
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
  const activeTab = useSelector(activeTabSelector)
  const tabs = useSelector(tabsSelector)
  const openSideBar = useSelector(openSideBarSelector)
  const { go } = useContext(Router)
  const dispatch = useDispatch()
  const handleChangeTab = useCallback(
    (value: string) => {
      go(`/notes/${value}`)
    },
    [go]
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

        return { ...tab, icon: folder ? <FolderIcon key={tab.value} /> : <NoteIcon key={tab.value} /> }
      })}
      onChange={handleChangeTab}
    >
      {tabs.map((tab) => {
        const folder = folders.find((folder) => folder.id === tab.value)
        const note = notes.find((note) => note.id === tab.value)
        if (folder) {
          return (
            <TabPanel value={tab.value} key={tab.value}>
              <FlexColumn>
                <FolderMenu folder={folder} />
                {folder.name}
              </FlexColumn>
            </TabPanel>
          )
        }
        if (note) {
          return (
            <TabPanel value={tab.value} key={tab.value}>
              <FlexColumn>
                <NoteMenu note={note} />
                {note.content}
              </FlexColumn>
            </TabPanel>
          )
        }

        return <></>
      })}
    </TabView>
  )
}
