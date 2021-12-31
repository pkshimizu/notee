import type { NextPage } from 'next'
import { useSelector } from 'react-redux'
import { rootFolderSelector } from '../store/notes'
import { useEffect } from 'react'
import { useNotesPage } from '../hooks/usePages'

const Home: NextPage = () => {
  const root = useSelector(rootFolderSelector)
  const notesPage = useNotesPage()
  useEffect(() => {
    if (root) {
      notesPage(root.id)
    }
  }, [root, notesPage])

  return <></>
}

export default Home
