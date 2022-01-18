import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginPage } from '../../hooks/usePages'
import { currentUserSelector, initializedSelector } from '../../store/session/selectors'
import { initializeSession } from '../../store/session'

type AuthProps = {
  children: ReactNode
}

export default function Auth({ children }: AuthProps) {
  const currentUser = useSelector(currentUserSelector)
  const initialized = useSelector(initializedSelector)
  const loginPage = useLoginPage()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSession())
  }, [dispatch])

  useEffect(() => {
    if (initialized && currentUser === undefined) {
      loginPage()
    }
  }, [initialized, currentUser, loginPage])

  if (initialized) {
    return <>{children}</>
  } else {
    return <></>
  }
}
