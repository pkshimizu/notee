import { ReactNode, useContext, useEffect } from 'react'
import { Router } from './RouterProvider'
import { useDispatch, useSelector } from 'react-redux'
import sessionSlice, { currentUserSelector, initializeSession, User } from '../../store/session'

type AuthProps = {
  children: ReactNode
}

export default function Auth({ children }: AuthProps) {
  const currentUser = useSelector(currentUserSelector)
  const { go } = useContext(Router)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      initializeSession({
        handleChangeAuthState: (user?: User) => {
          dispatch(sessionSlice.actions.changeCurrentUser(user))
        },
      })
    )
  }, [dispatch])

  useEffect(() => {
    if (currentUser === undefined) {
      go('/login')
    }
  }, [currentUser, go])

  return <>{children}</>
}
