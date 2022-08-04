import AppBar from '../atoms/surfaces/AppBar'
import { FlexRow } from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { DeleteIcon } from '../atoms/display/Icons'
import { useSelector } from 'react-redux'
import { useTrashEmptyDialog } from '../../hooks/useDialogs'
import NotesSelectors from '../../store/notes/selectors'

type TrashMenuProps = {}

export default function TrashMenu({}: TrashMenuProps) {
  const folders = useSelector(NotesSelectors.trashFolders)
  const notes = useSelector(NotesSelectors.trashNotes)
  const trashEmptyDialog = useTrashEmptyDialog()

  return (
    <AppBar>
      <FlexRow justify={'space-between'}>
        <IconButton
          label={{ value: 'Empty trash' }}
          color={'white'}
          onClick={trashEmptyDialog.open}
          disabled={folders.length === 0 && notes.length === 0}
        >
          <DeleteIcon />
        </IconButton>
      </FlexRow>
    </AppBar>
  )
}
