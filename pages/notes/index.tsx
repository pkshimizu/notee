import { useSelector } from 'react-redux'
import { rootFolderSelector } from '../../store/notes/selectors'
import { useEffect } from 'react'
import { useNotesPage } from '../../hooks/usePages'

export default function Notes() {
  const root = useSelector(rootFolderSelector)
  const notesPage = useNotesPage()
  useEffect(() => {
    if (root) {
      notesPage(root.id)
    }
  }, [notesPage, root])

  return <></>
}
