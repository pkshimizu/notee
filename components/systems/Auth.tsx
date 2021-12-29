import { ReactNode, useContext, useEffect } from 'react'
import { Router } from './RouterProvider'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserSelector, initializedSelector, initializeSession } from '../../store/session'

type AuthProps = {
  children: ReactNode
}

export default function Auth({ children }: AuthProps) {
  const currentUser = useSelector(currentUserSelector)
  const initialized = useSelector(initializedSelector)
  const { go } = useContext(Router)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSession())
  }, [dispatch])

  useEffect(() => {
    if (initialized && currentUser === undefined) {
      go('/login')
    }
  }, [initialized, currentUser, go])

  if (initialized) {
    return <>{children}</>
  } else {
    return <></>
  }
}
