import AppBar from '../atoms/surfaces/AppBar'
import { FlexRow } from '../atoms/layout/Flex'
import IconButton from '../atoms/inputs/IconButton'
import { CloseIcon } from '../atoms/display/Icons'
import { useCallback } from 'react'
import { useWorkspaceTab } from '../../hooks/useWorkspaceTab'

type SearchResultsMenuProps = {}

export default function SearchResultsMenu({}: SearchResultsMenuProps) {
  const { closeSearch } = useWorkspaceTab()
  const handleClose = useCallback(() => {
    closeSearch()
  }, [closeSearch])

  return (
    <AppBar>
      <FlexRow justify={'flex-end'}>
        <IconButton label={'close tab'} color={'white'} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </FlexRow>
    </AppBar>
  )
}
