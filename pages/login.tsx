import { FlexColumn, FlexRow } from '../components/atoms/layout/Flex'
import Button from '../components/atoms/inputs/Button'
import { GitHubIcon, GoogleIcon } from '../components/atoms/display/Icons'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRootPage } from '../hooks/usePages'
import { currentUserSelector } from '../store/session/selectors'
import { loginWithGitHub, loginWithGoogle } from '../store/session/actions'
import { useTitle } from '../hooks/useTitle'
import Image from '../components/atoms/display/Image'
import Label from '../components/atoms/display/Label'
import LocaleSelectLink from '../components/organisms/LocaleSelectLink'

export default function Login() {
  const currentUser = useSelector(currentUserSelector)
  const { setTitle } = useTitle()
  const rootPage = useRootPage()
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentUser) {
      rootPage()
    }
    setTitle({ value: 'Login' })
  }, [currentUser, rootPage, setTitle])

  const handleLogInWithGoogle = useCallback(() => {
    dispatch(loginWithGoogle())
  }, [dispatch])
  const handleLogInWithGitHub = useCallback(() => {
    dispatch(loginWithGitHub())
  }, [dispatch])

  return (
    <FlexColumn align={'center'} height={'100vh'} width={'100%'}>
      <FlexRow align={'center'}>
        <Image url={'/logo.svg'} alt={'logo'} width={128} height={170} />
        <FlexColumn>
          <FlexColumn space={0}>
            <Label variant={'title'} text={{ value: 'notee' }} />
            <Label variant={'caption'} text={{ value: 'Simple Personal Note' }} />
          </FlexColumn>
          <FlexColumn>
            <Button icon={<GoogleIcon />} color={'google'} onClick={handleLogInWithGoogle}>
              <Label text={{ value: 'Login with Google' }} />
            </Button>
            <Button icon={<GitHubIcon />} color={'github'} onClick={handleLogInWithGitHub}>
              <Label text={{ value: 'Login with GitHub' }} />
            </Button>
          </FlexColumn>
          <LocaleSelectLink path={'login'} />
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  )
}

Login.login = 'notAllowed'
