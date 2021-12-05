import type { NextPage } from 'next'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'
import { useContext, useEffect } from 'react'
import { Repository } from '../components/systems/RepositoryProvider'
import { AuthContext } from '../components/systems/Auth'
import MemoTree from '../components/organisms/MemoTree'
import { Folder } from '../repositories/MemoRepository'

const Home: NextPage = () => {
  const { currentUser } = useContext(AuthContext)
  const { memoRepository } = useContext(Repository)
  useEffect(() => {
    if (currentUser) {
      memoRepository.create(currentUser)
    }
  }, [currentUser, memoRepository])

  return (
    <WorkspaceLayout sidebar={<MemoTree folder={new Folder('フォルダー', [])} />}>
      <></>
    </WorkspaceLayout>
  )
}

export default Home
