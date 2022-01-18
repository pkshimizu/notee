import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import SearchField from '../molecules/inputs/SearchField'
import Button from '../atoms/inputs/Button'
import { FavoriteIcon } from '../atoms/display/Icons'
import NoteTree from './NoteTree'
import { useFavoritesPage, useNotesPage } from '../../hooks/usePages'
import { useSelector } from 'react-redux'
import { rootFolderSelector } from '../../store/notes/selectors'
import { activeItemIdSelector } from '../../store/workspace/selectors'
import { useCallback } from 'react'

type WorkspaceSideBarProps = {}

export default function WorkspaceSideBar({}: WorkspaceSideBarProps) {
  const favoritesPage = useFavoritesPage()
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
      <FlexRow space={0} noGrow>
        <Button onClick={favoritesPage} icon={<FavoriteIcon />} variant={'text'}>
          Favorite
        </Button>
      </FlexRow>
      <NoteTree folder={root} activeId={activeItemId} onSelect={handleSelectItem} />
    </FlexColumn>
  )
}
