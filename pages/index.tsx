import type { NextPage } from 'next'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'
import NoteTree from '../components/organisms/NoteTree'
import { useDispatch, useSelector } from 'react-redux'
import TabView from '../components/atoms/navigation/TabView'
import TabPanel from '../components/atoms/navigation/TabPanel'
import Label from '../components/atoms/display/Label'
import { fetchRoot, foldersSelector, notesSelector, rootFolderSelector } from '../store/notes'
import workspaceSlice, { activeTabSelector, tabsSelector } from '../store/workspace'
import { useCallback, useEffect } from 'react'
import FolderIcon from '../components/atoms/display/icons/FolderIcon'
import NoteIcon from '../components/atoms/display/icons/NoteIcon'
import Flex from '../components/atoms/layout/Flex'
import FolderMenu from '../components/organisms/FolderMenu'
import NoteMenu from '../components/organisms/NoteMenu'

const Home: NextPage = () => {
  const root = useSelector(rootFolderSelector)
  const folders = useSelector(foldersSelector)
  const notes = useSelector(notesSelector)
  const tabs = useSelector(tabsSelector)
  const activeTab = useSelector(activeTabSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRoot())
  }, [dispatch])
  const handleChangeTab = useCallback(
    (value: string) => {
      dispatch(workspaceSlice.actions.active({ id: value }))
    },
    [dispatch]
  )

  return (
    <WorkspaceLayout sidebar={<NoteTree folder={root} />}>
      {activeTab ? (
        <TabView
          value={activeTab.value}
          tabs={tabs.map((tab) => {
            const folder = folders.find((folder) => folder.id === tab.value)

            return { ...tab, icon: folder ? <FolderIcon /> : <NoteIcon /> }
          })}
          onChange={handleChangeTab}
        >
          {tabs.map((tab) => {
            const folder = folders.find((folder) => folder.id === tab.value)
            const note = notes.find((note) => note.id === tab.value)
            if (folder) {
              return (
                <TabPanel value={tab.value} key={tab.value}>
                  <Flex direction={'column'}>
                    <FolderMenu folder={folder} />
                    {folder.name}
                  </Flex>
                </TabPanel>
              )
            }
            if (note) {
              return (
                <TabPanel value={tab.value} key={tab.value}>
                  <Flex direction={'column'}>
                    <NoteMenu note={note} />
                    {note.content}
                  </Flex>
                </TabPanel>
              )
            }

            return <></>
          })}
        </TabView>
      ) : (
        <Label>フォルダーかノートを選択してください</Label>
      )}
    </WorkspaceLayout>
  )
}

export default Home
