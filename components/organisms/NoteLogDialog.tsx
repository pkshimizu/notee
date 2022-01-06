import { Note, NoteLog, updateNote } from '../../store/notes'
import TextEditor from '../atoms/inputs/TextEditor'
import Dialog from '../atoms/feedback/Dialog'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback, useState } from 'react'
import { ApplyIcon, CloseIcon, NextIcon, PrevIcon } from '../atoms/display/Icons'
import { useDispatch } from 'react-redux'
import DateTimeLabel from '../molecules/display/DateTimeLabel'

type NoteLogDialogProps = {
  open: boolean
  note: Note
  log: NoteLog
  onClose: () => void
}

export default function NoteLogDialog({ open, note, log, onClose }: NoteLogDialogProps) {
  const [selectedIndex, setSelectedIndex] = useState(note.logs.map((log) => log.id).indexOf(log.id))
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
    dispatch(updateNote({ note, content: note.logs[selectedIndex].content }))
  }, [dispatch, note, selectedIndex])

  return (
    <Dialog
      open={open}
      width={'xl'}
      title={<DateTimeLabel datetime={note.logs[selectedIndex].updatedAt} />}
      onClose={onClose}
      actions={
        <>
          <IconButton disabled={selectedIndex <= 0} onClick={handlePrevLog}>
            <PrevIcon />
          </IconButton>
          <IconButton disabled={selectedIndex >= note.logs.length - 1} onClick={handleNextLog}>
            <NextIcon />
          </IconButton>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <IconButton onClick={handleApplyLog}>
            <ApplyIcon />
          </IconButton>
        </>
      }
    >
      <TextEditor content={note.logs[selectedIndex].content} width={'800px'} height={'80vh'} readOnly />
    </Dialog>
  )
}
