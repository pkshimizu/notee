import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'
import { useCallback } from 'react'
import AppBar from '../atoms/surfaces/AppBar'
import { FlexRow } from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { CloseIcon } from '../atoms/display/Icons'

type TrashMenuProps = {}

export default function TrashMenu({}: TrashMenuProps) {
  const { closeTrash } = useWorkspaceTab()
  const handleClose = useCallback(() => {
    closeTrash()
  }, [closeTrash])

  return (
    <AppBar>
      <FlexRow justify={'flex-end'}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </FlexRow>
    </AppBar>
  )
}
