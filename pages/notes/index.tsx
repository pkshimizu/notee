import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useFoldersPage } from '../../hooks/usePages'
import NotesSelectors from '../../store/notes/selectors'

export default function Notes() {
  const root = useSelector(NotesSelectors.rootFolder)
  const foldersPage = useFoldersPage()
  useEffect(() => {
    if (root) {
      foldersPage(root.id)
    }
  }, [foldersPage, root])

  return <></>
}

Notes.login = 'required'
