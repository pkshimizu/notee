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
import { Note, NoteLog } from '../../store/notes/models'

type NoteLogDialogProps = {
  note: Note
  log: NoteLog
}

export default function NoteLogDialog({ note, log }: NoteLogDialogProps) {
  const { state, close } = useNoteLogDialog()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { dateTimeFormatter } = useDay()
  const { restore } = useNoteLog()
  const dispatch = useDispatch()
  useEffect(() => {
    setSelectedIndex(note.logs.map((log) => log.id).indexOf(log.id))
  }, [note, log, setSelectedIndex])
  const handleNextLog = useCallback(() => {
    if (selectedIndex < note.logs.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }, [selectedIndex, note, setSelectedIndex])
  const handlePrevLog = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }, [selectedIndex, setSelectedIndex])
  const handleApplyLog = useCallback(() => {
    const content = restore(note.logs, note.logs[selectedIndex].id).nextContent
    dispatch(NotesActions.updateNote({ note: note, content: content }))
  }, [dispatch, note, selectedIndex, restore])

  return (
    <Dialog
      open={state !== undefined}
      width={'xl'}
      height={'80vh'}
      title={dateTimeFormatter(note.logs[selectedIndex].updatedAt)}
      onClose={close}
      actions={
        <>
          <IconButton label={{ value: 'Prev log' }} disabled={selectedIndex <= 0} onClick={handlePrevLog}>
            <PrevIcon />
          </IconButton>
          <IconButton
            label={{ value: 'Next log' }}
            disabled={selectedIndex >= note.logs.length - 1}
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
      <NoteLogView note={note} log={note.logs[selectedIndex]} />
    </Dialog>
  )
}
