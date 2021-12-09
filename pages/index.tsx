import type { NextPage } from 'next'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'
import NoteTree from '../components/organisms/NoteTree'
import { Folder } from '../models/note'
import {useSelector} from "react-redux";
import {StoreState} from "../store";

const Home: NextPage = () => {
  const root = useSelector<StoreState, Folder>(state => state.notes.root)
  return (
    <WorkspaceLayout sidebar={<NoteTree folder={root} />}>
      <></>
    </WorkspaceLayout>
  )
}

export default Home
