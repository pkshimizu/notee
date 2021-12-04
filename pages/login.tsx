import { NextPage } from 'next'
import Flex from '../components/atoms/layout/Flex'
import Button from '../components/atoms/inputs/Button'
import GoogleIcon from '../components/atoms/display/icons/GoogleIcon'
import { useCallback, useContext, useEffect } from 'react'
import { Repository } from '../components/systems/RepositoryProvider'
import { AuthContext } from '../components/systems/Auth'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
  const { currentUser } = useContext(AuthContext)
  const { authRepository } = useContext(Repository)
  const router = useRouter()

  useEffect(() => {
    if (currentUser) {
      router.push('/')
    }
  }, [currentUser, router])

  const handleLogInWithGoogle = useCallback(() => {
    authRepository.loginWithGoogle()
  }, [authRepository])

  return (
    <Flex direction={'column'} align={'center'}>
      <Button icon={<GoogleIcon />} onClick={handleLogInWithGoogle}>
        Login with Google
      </Button>
    </Flex>
  )
}

export default Login
