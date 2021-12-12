import type { NextPage } from 'next'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'
import NoteTree from '../components/organisms/NoteTree'
import { Folder } from '../models/note'
import { useSelector } from 'react-redux'
import { StoreState } from '../store'
import TabView from '../components/atoms/navigation/TabView'
import TabPanel from '../components/atoms/navigation/TabPanel'

const Home: NextPage = () => {
  const root = useSelector<StoreState, Folder>((state) => state.notes.root)

  return (
    <WorkspaceLayout sidebar={<NoteTree folder={root} />}>
      <TabView value={'1'} tabs={[{ value: '1', label: 'new tab' }]}>
        <TabPanel value={'1'}>new tab</TabPanel>
      </TabView>
    </WorkspaceLayout>
  )
}

export default Home
