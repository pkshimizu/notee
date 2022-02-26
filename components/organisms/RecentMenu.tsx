import AppBar from '../atoms/surfaces/AppBar'
import { FlexRow } from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { CloseIcon } from '../atoms/display/Icons'
import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'
import { useCallback } from 'react'

export default function RecentMenu() {
  const { closeRecent } = useWorkspaceTab()
  const handleClose = useCallback(() => {
    closeRecent()
  }, [closeRecent])
  
  return (
    <AppBar>
      <FlexRow justify={'flex-end'}>
        <IconButton label={{ value: 'Close tab' }} color={'white'} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </FlexRow>
    </AppBar>
  )
}
