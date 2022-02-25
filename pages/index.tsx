import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useFoldersPage } from '../hooks/usePages'
import NotesSelectors from '../store/notes/selectors'

export default function Home() {
  const root = useSelector(NotesSelectors.rootFolder)
  const foldersPage = useFoldersPage()
  useEffect(() => {
    if (root) {
      foldersPage(root.id)
    }
  }, [root, foldersPage])

  return <></>
}

Home.login = 'required'
