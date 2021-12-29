import { NextPage } from 'next'
import { FlexColumn } from '../components/atoms/layout/Flex'
import Button from '../components/atoms/inputs/Button'
import { GoogleIcon } from '../components/atoms/display/Icons'
import { useCallback, useContext, useEffect } from 'react'
import { Router } from '../components/systems/RouterProvider'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserSelector, loginWithGoogle } from '../store/session'

const Login: NextPage = () => {
  const currentUser = useSelector(currentUserSelector)
  const { go } = useContext(Router)
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUser) {
      go('/', undefined)
    }
  }, [currentUser, go])

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
