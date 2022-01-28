import type { NextPage } from 'next'
import { useSelector } from 'react-redux'
import { rootFolderSelector } from '../store/notes/selectors'
import { useEffect } from 'react'
import { useFoldersPage } from '../hooks/usePages'

const Home: NextPage = () => {
  const root = useSelector(rootFolderSelector)
  const foldersPage = useFoldersPage()
  useEffect(() => {
    if (root) {
      foldersPage(root.id)
    }
  }, [root, foldersPage])

  return <></>
}

export default Home
