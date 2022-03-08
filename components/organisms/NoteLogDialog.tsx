import Dialog from '../atoms/feedback/Dialog'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback, useEffect, useState } from 'react'
import { ApplyIcon, CloseIcon, NextIcon, PrevIcon } from '../atoms/display/Icons'
import { useDispatch } from 'react-redux'
import NotesActions from '../../store/notes/actions'
import { useDay } from '../../hooks/useDay'
import NoteLogView from '../molecules/display/NoteLogView'
import useNoteLog from '../../hooks/useNoteLog'
import { useNoteLogDialog } from '../../hooks/useDialogs'

export default function NoteLogDialog() {
  const { state, close } = useNoteLogDialog()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { dateTimeFormatter } = useDay()
  const { restore } = useNoteLog()
  const dispatch = useDispatch()
  useEffect(() => {
    if (state) {
      setSelectedIndex(state.note.logs.map((log) => log.id).indexOf(state.log.id))
    }
  }, [state, setSelectedIndex])
  const handleNextLog = useCallback(() => {
    if (state) {
      if (selectedIndex < state.note.logs.length - 1) {
        setSelectedIndex(selectedIndex + 1)
      }
    }
  }, [selectedIndex, state, setSelectedIndex])
  const handlePrevLog = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }, [selectedIndex, setSelectedIndex])
  const handleApplyLog = useCallback(() => {
    if (state) {
      const content = restore(state.note.logs, state.note.logs[selectedIndex].id).nextContent
      dispatch(NotesActions.updateNote({ note: state.note, content: content }))
    }
  }, [dispatch, state, selectedIndex, restore])

  return (
    <Dialog
      open={state !== undefined}
      width={'xl'}
      height={'80vh'}
      title={state && dateTimeFormatter(state.note.logs[selectedIndex].updatedAt)}
      onClose={close}
      actions={
        <>
          <IconButton label={{ value: 'Prev log' }} disabled={selectedIndex <= 0} onClick={handlePrevLog}>
            <PrevIcon />
          </IconButton>
          <IconButton
            label={{ value: 'Next log' }}
            disabled={state && selectedIndex >= state.note.logs.length - 1}
            onClick={handleNextLog}
          >
            <NextIcon />
          </IconButton>
          <IconButton label={{ value: 'Close' }} onClick={close}>
            <CloseIcon />
          </IconButton>
          <IconButton label={{ value: 'Apply log' }} onClick={handleApplyLog}>
            <ApplyIcon />
          </IconButton>
        </>
      }
    >
      {state && <NoteLogView note={state.note} log={state.note.logs[selectedIndex]} />}
    </Dialog>
  )
}
