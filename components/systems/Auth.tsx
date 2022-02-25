import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginPage, useRootPage } from '../../hooks/usePages'
import { currentUserSelector, initializedSelector } from '../../store/session/selectors'
import { initializeSession } from '../../store/session'
import systemSlice from '../../store/system'
import { Component } from '../../types/react'

export type LoginType = 'required' | 'any' | 'notAllowed'

type AuthProps = {
  login?: LoginType
  children: Component
}

export default function Auth({ login = 'any', children }: AuthProps) {
  const currentUser = useSelector(currentUserSelector)
  const initialized = useSelector(initializedSelector)
  const loginPage = useLoginPage()
  const rootPage = useRootPage()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSession())
  }, [dispatch])

  useEffect(() => {
    if (!initialized) {
      dispatch(systemSlice.actions.loading({ loading: true }))

      return
    }
    dispatch(systemSlice.actions.loading({ loading: false }))
    if (login === 'required' && currentUser === undefined) {
      loginPage()
    }
    if (login === 'notAllowed' && currentUser) {
      rootPage()
    }
  }, [dispatch, login, initialized, currentUser, loginPage, rootPage])

  if (!initialized) {
    return <></>
  }
  if (login === 'any') {
    return <>{children}</>
  }
  if (login === 'required' && currentUser) {
    return <>{children}</>
  }
  if (login === 'notAllowed' && currentUser === undefined) {
    return <>{children}</>
  }

  return <></>
}
