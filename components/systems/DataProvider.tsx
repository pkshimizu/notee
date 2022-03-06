import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NotesActions from '../../store/notes/actions'
import SessionActions from '../../store/session/actions'
import { useDeviceType } from '../../hooks/useDeviceType'
import { Component } from '../../types/react'
import NotesSelectors from '../../store/notes/selectors'
import SessionSelectors from '../../store/session/selectors'

type DataProviderProps = {
  children: Component
}

export default function DataProvider({ children }: DataProviderProps) {
  const currentUser = useSelector(SessionSelectors.currentUser)
  const root = useSelector(NotesSelectors.rootFolder)
  const deviceType = useDeviceType()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(NotesActions.fetchRoot())
    dispatch(SessionActions.fetchUserSettings({ mobile: deviceType === 'Mobile' }))
    const onFocus = () => {
      dispatch(NotesActions.fetchNotes())
    }
    window.addEventListener('focus', onFocus)

    return () => {
      window.removeEventListener('focus', onFocus)
    }
  }, [dispatch, deviceType])

  if (currentUser === undefined || root) {
    return <>{children}</>
  } else {
    return <></>
  }
}
