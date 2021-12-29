import type { NextPage } from 'next'
import { useSelector } from 'react-redux'
import { rootFolderSelector } from '../store/notes'
import { useContext, useEffect } from 'react'
import { Router } from '../components/systems/RouterProvider'

const Home: NextPage = () => {
  const root = useSelector(rootFolderSelector)
  const { go } = useContext(Router)
  useEffect(() => {
    if (root) {
      go(`/notes/${root.id}`)
    }
  }, [root, go])

  return <></>
}

export default Home
