import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/session/selectors'
import { rootFolderSelector } from '../../store/notes/selectors'
import { fetchNotes, fetchRoot } from '../../store/notes/actions'
import { fetchUserSettings } from '../../store/session/actions'
import { useDeviceType } from '../../hooks/useDeviceType'
import { Component } from '../../types/react'

type DataProviderProps = {
  children: Component
}

export default function DataProvider({ children }: DataProviderProps) {
  const currentUser = useSelector(currentUserSelector)
  const root = useSelector(rootFolderSelector)
  const deviceType = useDeviceType()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRoot())
    dispatch(fetchUserSettings({ mobile: deviceType === 'Mobile' }))
    const onFocus = () => {
      dispatch(fetchNotes())
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
