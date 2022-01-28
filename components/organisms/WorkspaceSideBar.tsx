import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import SearchField from '../molecules/inputs/SearchField'
import { DeleteIcon, FavoriteIcon } from '../atoms/display/Icons'
import NoteTree from './NoteTree'
import { useItemsPage } from '../../hooks/usePages'
import { useSelector } from 'react-redux'
import { rootFolderSelector } from '../../store/notes/selectors'
import { activeItemIdSelector } from '../../store/workspace/selectors'
import { useCallback } from 'react'
import Link from '../atoms/navigation/Link'

type WorkspaceSideBarProps = {}

export default function WorkspaceSideBar({}: WorkspaceSideBarProps) {
  const root = useSelector(rootFolderSelector)
  const activeItemId = useSelector(activeItemIdSelector)
  const itemsPage = useItemsPage()
  const handleSelectItem = useCallback(
    (id) => {
      itemsPage(id)
    },
    [itemsPage]
  )

  return (
    <FlexColumn space={0} noWrap>
      <SearchField />
      <Link href={`/favorites`}>
        <FlexRow space={0} noGrow pt={1} pb={1} pl={1} pr={1}>
          <FavoriteIcon />
          Favorite
        </FlexRow>
      </Link>
      <Link href={`/trash`}>
        <FlexRow space={0} noGrow pt={1} pb={1} pl={1} pr={1}>
          <DeleteIcon />
          Trash
        </FlexRow>
      </Link>
      <NoteTree folder={root} activeId={activeItemId} onSelect={handleSelectItem} />
    </FlexColumn>
  )
}
