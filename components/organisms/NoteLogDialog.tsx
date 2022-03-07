import { Note, NoteLog } from '../../store/notes/models'
import Dialog from '../atoms/feedback/Dialog'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback, useState } from 'react'
import { ApplyIcon, CloseIcon, NextIcon, PrevIcon } from '../atoms/display/Icons'
import { useDispatch } from 'react-redux'
import NotesActions from '../../store/notes/actions'
import { useDay } from '../../hooks/useDay'
import NoteLogView from '../molecules/display/NoteLogView'
import useNoteLog from '../../hooks/useNoteLog'

type NoteLogDialogProps = {
  open: boolean
  note: Note
  log: NoteLog
  onClose: () => void
}

export default function NoteLogDialog({ open, note, log, onClose }: NoteLogDialogProps) {
  const [selectedIndex, setSelectedIndex] = useState(note.logs.map((log) => log.id).indexOf(log.id))
  const { dateTimeFormatter } = useDay()
  const { restore } = useNoteLog()
  const dispatch = useDispatch()
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
    dispatch(NotesActions.updateNote({ note, content: content }))
  }, [dispatch, note, selectedIndex, restore])

  return (
    <Dialog
      open={open}
      width={'xl'}
      title={dateTimeFormatter(note.logs[selectedIndex].updatedAt)}
      onClose={onClose}
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
          <IconButton label={{ value: 'Close' }} onClick={onClose}>
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
