import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import SearchField from '../molecules/inputs/SearchField'
import { TrashIcon, FavoriteIcon, LogIcon } from '../atoms/display/Icons'
import NoteTree from './NoteTree'
import { useItemsPage } from '../../hooks/usePages'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import Link from '../atoms/navigation/Link'
import workspaceSlice from '../../store/workspace'
import { usePath } from '../../hooks/usePath'
import Label from '../atoms/display/Label'
import NotesSelectors from '../../store/notes/selectors'
import WorkspaceSelectors from '../../store/workspace/selectors'

type WorkspaceSideBarProps = {}

export default function WorkspaceSideBar({}: WorkspaceSideBarProps) {
  const root = useSelector(NotesSelectors.rootFolder)
  const activeItemId = useSelector(WorkspaceSelectors.activeItemId)
  const itemsPage = useItemsPage()
  const expandedNoteTreeIds = useSelector(WorkspaceSelectors.expandedNoteTreeIds)
  const { favorites, trash, recent } = usePath()
  const dispatch = useDispatch()
  const handleSelectItem = useCallback(
    (id) => {
      itemsPage(id)
    },
    [itemsPage]
  )
  const handleChangeExpanded = useCallback(
    (expanded: string[]) => {
      dispatch(workspaceSlice.actions.updateNoteTreeExpanded({ ids: expanded }))
    },
    [dispatch]
  )

  return (
    <FlexColumn space={0} noWrap>
      <SearchField />
      <FlexColumn space={0} noWrap>
        <Link href={favorites()}>
          <FlexRow noGrow pt={1} pb={1} pl={1} pr={1}>
            <FavoriteIcon />
            <Label text={{ value: 'Favorites' }} />
          </FlexRow>
        </Link>
        <Link href={recent()}>
          <FlexRow noGrow pt={1} pb={1} pl={1} pr={1}>
            <LogIcon />
            <Label text={{ value: 'Recent' }} />
          </FlexRow>
        </Link>
        <Link href={trash()}>
          <FlexRow noGrow pt={1} pb={1} pl={1} pr={1}>
            <TrashIcon />
            <Label text={{ value: 'Trash' }} />
          </FlexRow>
        </Link>
        <NoteTree
          folder={root}
          activeId={activeItemId}
          expandedIds={expandedNoteTreeIds}
          onSelect={handleSelectItem}
          onChangeExpanded={handleChangeExpanded}
        />
      </FlexColumn>
    </FlexColumn>
  )
}
