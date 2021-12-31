import { NextPage } from 'next'
import { FlexColumn } from '../components/atoms/layout/Flex'
import Button from '../components/atoms/inputs/Button'
import { GoogleIcon } from '../components/atoms/display/Icons'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserSelector, loginWithGoogle } from '../store/session'
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

  return (
    <FlexColumn align={'center'}>
      <Button icon={<GoogleIcon />} onClick={handleLogInWithGoogle}>
        Login with Google
      </Button>
    </FlexColumn>
  )
}

export default Login
