import AppBar from '../atoms/surfaces/AppBar'
import { FlexRow } from '../atoms/layout/Flex'

type FavoritesMenuProps = {}

export default function FavoritesMenu({}: FavoritesMenuProps) {
  return (
    <AppBar>
      <FlexRow justify={'flex-end'}></FlexRow>
    </AppBar>
  )
}
