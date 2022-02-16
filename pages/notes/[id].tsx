import WorkspaceLayout from '../../components/templates/WorkspaceLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { notesSelector } from '../../store/notes/selectors'
import workspaceSlice from '../../store/workspace'
import { useTitle } from '../../hooks/useTitle'
import NoteTabPanel from '../../components/organisms/NoteTabPanel'
import { useNote } from '../../hooks/useNote'

export default function Workspace() {
  const notes = useSelector(notesSelector)
  const { setTitle } = useTitle()
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = router.query
  const note = notes.find((note) => note.id === id)
  const { title } = useNote(note)
  useEffect(() => {
    if (note) {
      dispatch(workspaceSlice.actions.openNote({ id: note.id }))
      setTitle(title())
    }
  }, [dispatch, note, title, setTitle])
  if (note) {
    return <NoteTabPanel notes={notes} activeNote={note} />
  }

  return <></>
}

Workspace.layout = WorkspaceLayout
Workspace.login = 'required'
