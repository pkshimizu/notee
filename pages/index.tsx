import type { NextPage } from 'next'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'
import NoteTree from '../components/organisms/NoteTree'
import { useDispatch, useSelector } from 'react-redux'
import TabView from '../components/atoms/navigation/TabView'
import TabPanel from '../components/atoms/navigation/TabPanel'
import Label from '../components/atoms/display/Label'
import { rootFolderSelector } from '../store/notes'
import workspaceSlice, { activeTabSelector, tabsSelector, WorkspaceTab } from '../store/workspace'
import { useCallback } from 'react'
import FolderIcon from '../components/atoms/display/icons/FolderIcon'
import NoteIcon from '../components/atoms/display/icons/NoteIcon'

const Home: NextPage = () => {
  const root = useSelector(rootFolderSelector)
  const tabs = useSelector(tabsSelector)
  const activeTab = useSelector(activeTabSelector)
  const dispatch = useDispatch()
  const handleChangeTab = useCallback(
    (value: string) => {
      dispatch(workspaceSlice.actions.active(value))
    },
    [dispatch]
  )

  return (
    <WorkspaceLayout sidebar={<NoteTree folder={root} />}>
      {activeTab ? (
        <TabView
          value={activeTab.value}
          tabs={tabs.map((tab) => ({ ...tab, icon: tab.folder ? <FolderIcon /> : <NoteIcon /> }))}
          onChange={handleChangeTab}
        >
          {tabs.map((tab) => {
            if (tab.folder) {
              return (
                <TabPanel value={tab.value} key={tab.value}>
                  {tab.folder.name}
                </TabPanel>
              )
            }
            if (tab.note) {
              return (
                <TabPanel value={tab.value} key={tab.value}>
                  {tab.note.content}
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
