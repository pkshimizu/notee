import type { NextPage } from 'next'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'
import NoteTree from '../components/organisms/NoteTree'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '../store'
import TabView from '../components/atoms/navigation/TabView'
import TabPanel from '../components/atoms/navigation/TabPanel'
import Label from '../components/atoms/display/Label'
import { Folder } from '../store/notes'
import workspaceSlice, { WorkspaceTab } from '../store/workspace'
import { useCallback } from 'react'
import FolderIcon from '../components/atoms/display/icons/FolderIcon'
import NoteIcon from '../components/atoms/display/icons/NoteIcon'

const Home: NextPage = () => {
  const root = useSelector<StoreState, Folder>((state) => state.notes.root)
  const tabs = useSelector<StoreState, WorkspaceTab[]>((state) => state.workspace.tabs)
  const activeTabId = useSelector<StoreState, string | undefined>((state) => state.workspace.activeTabId)
  const dispatch = useDispatch()
  const handleChangeTab = useCallback(
    (value: string) => {
      dispatch(workspaceSlice.actions.active(value))
    },
    [dispatch]
  )

  return (
    <WorkspaceLayout sidebar={<NoteTree folder={root} />}>
      {activeTabId ? (
        <TabView
          value={activeTabId}
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
