import type { NextPage } from 'next'
import { useCallback, useContext } from 'react'
import { AuthContext } from '../components/systems/Auth'
import { Repository } from '../components/systems/RepositoryProvider'
import WorkspaceLayout from '../components/templates/WorkspaceLayout'

const Home: NextPage = () => {
  const { currentUser } = useContext(AuthContext)
  const { authRepository } = useContext(Repository)

  const handleLogIn = useCallback(() => {
    authRepository.loginWithGoogle()
  }, [authRepository])
  const handleLogOut = useCallback(() => {
    authRepository.logout()
  }, [authRepository])

  return (
    <WorkspaceLayout sidebar={<></>}>
      <></>
    </WorkspaceLayout>
  )
}

export default Home
