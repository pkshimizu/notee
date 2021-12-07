import type { NextPage } from 'next'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'
import NoteTree from '../components/organisms/NoteTree'
import { Folder } from '../models/note'

const Home: NextPage = () => {
  return (
    <WorkspaceLayout sidebar={<NoteTree folder={new Folder('フォルダー', [])} />}>
      <></>
    </WorkspaceLayout>
  )
}

export default Home
