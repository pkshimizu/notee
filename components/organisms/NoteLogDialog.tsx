import { Note, NoteLog } from '../../store/notes/models'
import TextEditor from '../atoms/inputs/TextEditor'
import Dialog from '../atoms/feedback/Dialog'
import IconButton from '../atoms/inputs/IconButton'
import { useCallback, useState } from 'react'
import { ApplyIcon, CloseIcon, NextIcon, PrevIcon } from '../atoms/display/Icons'
import { useDispatch, useSelector } from 'react-redux'
import DateTimeLabel from '../molecules/display/DateTimeLabel'
import { updateNote } from '../../store/notes/actions'
import { editorSettingsSelector } from '../../store/session/selectors'

type NoteLogDialogProps = {
  open: boolean
  note: Note
  log: NoteLog
  onClose: () => void
}

export default function NoteLogDialog({ open, note, log, onClose }: NoteLogDialogProps) {
  const [selectedIndex, setSelectedIndex] = useState(note.logs.map((log) => log.id).indexOf(log.id))
  const editorSettings = useSelector(editorSettingsSelector)
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
          <IconButton label={'Prev log'} disabled={selectedIndex <= 0} onClick={handlePrevLog}>
            <PrevIcon />
          </IconButton>
          <IconButton label={'Next log'} disabled={selectedIndex >= note.logs.length - 1} onClick={handleNextLog}>
            <NextIcon />
          </IconButton>
          <IconButton label={'Close'} onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <IconButton label={'Apply log'} onClick={handleApplyLog}>
            <ApplyIcon />
          </IconButton>
        </>
      }
    >
      <TextEditor
        content={note.logs[selectedIndex].content}
        width={'100%'}
        height={'80vh'}
        keyBinding={editorSettings.keyBinding}
        theme={editorSettings.theme}
        mode={note.contentType}
        readOnly
      />
    </Dialog>
  )
}
