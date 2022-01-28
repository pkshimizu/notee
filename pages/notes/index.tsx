import { useSelector } from 'react-redux'
import { rootFolderSelector } from '../../store/notes/selectors'
import { useEffect } from 'react'
import { useFoldersPage } from '../../hooks/usePages'

export default function Notes() {
  const root = useSelector(rootFolderSelector)
  const foldersPage = useFoldersPage()
  useEffect(() => {
    if (root) {
      foldersPage(root.id)
    }
  }, [foldersPage, root])

  return <></>
}
