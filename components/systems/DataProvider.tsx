import { ReactNode, useEffect } from 'react'
import { fetchRoot, rootFolderSelector } from '../../store/notes'
import { useDispatch, useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/session'

type DataProviderProps = {
  children: ReactNode
}

export default function DataProvider({ children }: DataProviderProps) {
  const currentUser = useSelector(currentUserSelector)
  const root = useSelector(rootFolderSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRoot())
  }, [dispatch])

  if (currentUser === undefined || root) {
    return <>{children}</>
  } else {
    return <></>
  }
}
