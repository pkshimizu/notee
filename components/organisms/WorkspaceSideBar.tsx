import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import SearchField from '../molecules/inputs/SearchField'
import { DeleteIcon, FavoriteIcon } from '../atoms/display/Icons'
import NoteTree from './NoteTree'
import { useNotesPage } from '../../hooks/usePages'
import { useSelector } from 'react-redux'
import { rootFolderSelector } from '../../store/notes/selectors'
import { activeItemIdSelector } from '../../store/workspace/selectors'
import { useCallback } from 'react'
import Link from '../atoms/navigation/Link'

type WorkspaceSideBarProps = {}

export default function WorkspaceSideBar({}: WorkspaceSideBarProps) {
  const root = useSelector(rootFolderSelector)
  const activeItemId = useSelector(activeItemIdSelector)
  const notesPage = useNotesPage()
  const handleSelectItem = useCallback(
    (id) => {
      notesPage(id)
    },
    [notesPage]
  )

  return (
    <FlexColumn space={0} noWrap>
      <SearchField />
      <Link href={`/notes/favorites`}>
        <FlexRow space={0} noGrow pt={1} pb={1} pl={1} pr={1}>
          <FavoriteIcon />
          Favorite
        </FlexRow>
      </Link>
      <Link href={`/notes/trash`}>
        <FlexRow space={0} noGrow pt={1} pb={1} pl={1} pr={1}>
          <DeleteIcon />
          Trash
        </FlexRow>
      </Link>
      <NoteTree folder={root} activeId={activeItemId} onSelect={handleSelectItem} />
    </FlexColumn>
  )
}
