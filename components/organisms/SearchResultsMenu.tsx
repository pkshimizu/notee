import AppBar from '../atoms/surfaces/AppBar'
import { FlexRow } from '../atoms/layout/Flex'

type SearchResultsMenuProps = {}

export default function SearchResultsMenu({}: SearchResultsMenuProps) {
  return (
    <AppBar>
      <FlexRow justify={'flex-end'}></FlexRow>
    </AppBar>
  )
}
