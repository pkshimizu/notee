import type { NextPage } from 'next'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'
import NoteTree from '../components/organisms/NoteTree'
import { useSelector } from 'react-redux'
import { StoreState } from '../store'
import TabView from '../components/atoms/navigation/TabView'
import TabPanel from '../components/atoms/navigation/TabPanel'
import Label from '../components/atoms/display/Label'
import { Folder } from '../store/notes'
import { WorkspaceTab } from '../store/workspace'

const Home: NextPage = () => {
  const root = useSelector<StoreState, Folder>((state) => state.notes.root)
  const tabs = useSelector<StoreState, WorkspaceTab[]>((state) => state.workspace.tabs)
  const activeTabId = useSelector<StoreState, string | undefined>((state) => state.workspace.activeTabId)

  return (
    <WorkspaceLayout sidebar={<NoteTree folder={root} />}>
      {activeTabId ? (
        <TabView value={activeTabId} tabs={tabs}>
          {tabs.map((tab) => {
            if (tab.folder) {
              return <TabPanel value={tab.value}>{tab.folder.name}</TabPanel>
            }
            if (tab.note) {
              return <TabPanel value={tab.value}>{tab.note.content}</TabPanel>
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
