import type { NextPage } from 'next'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'
import {useContext, useEffect} from "react";
import {Repository} from "../components/systems/RepositoryProvider";
import {AuthContext} from "../components/systems/Auth";

const Home: NextPage = () => {
  const {currentUser} = useContext(AuthContext)
  const { memoRepository } = useContext(Repository)
  useEffect(() => {
    if (currentUser) {
      memoRepository.create(currentUser)
    }
  }, [currentUser])
  return (
    <WorkspaceLayout sidebar={<></>}>
      <></>
    </WorkspaceLayout>
  )
}

export default Home
