import { NextPage } from 'next'
import { FlexColumn } from '../components/atoms/layout/Flex'
import Button from '../components/atoms/inputs/Button'
import { GitHubIcon, GoogleIcon } from '../components/atoms/display/Icons'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserSelector, loginWithGitHub, loginWithGoogle } from '../store/session'
import { useRootPage } from '../hooks/usePages'

const Login: NextPage = () => {
  const currentUser = useSelector(currentUserSelector)
  const rootPage = useRootPage()
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUser) {
      rootPage()
    }
  }, [currentUser, rootPage])

  const handleLogInWithGoogle = useCallback(() => {
    dispatch(loginWithGoogle())
  }, [dispatch])
  const handleLogInWithGitHub = useCallback(() => {
    dispatch(loginWithGitHub())
  }, [dispatch])

  return (
    <FlexColumn align={'center'}>
      <Button icon={<GoogleIcon />} onClick={handleLogInWithGoogle}>
        Login with Google
      </Button>
      <Button icon={<GitHubIcon />} onClick={handleLogInWithGitHub}>
        Login with Github
      </Button>
    </FlexColumn>
  )
}

export default Login
