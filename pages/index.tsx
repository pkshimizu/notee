import type { NextPage } from 'next'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'
import MemoTree from '../components/organisms/MemoTree'
import { Folder } from '../models/memo'

const Home: NextPage = () => {
  return (
    <WorkspaceLayout sidebar={<MemoTree folder={new Folder('フォルダー', [])} />}>
      <></>
    </WorkspaceLayout>
  )
}

export default Home
