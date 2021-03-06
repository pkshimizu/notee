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
import Divider from '../atoms/display/Divider'
import SessionSelectors from '../../store/session/selectors'
import StorageCapacityView from './StorageCapacityView'

type WorkspaceSideBarProps = {}

export default function WorkspaceSideBar({}: WorkspaceSideBarProps) {
  const root = useSelector(NotesSelectors.rootFolder)
  const activeItemId = useSelector(WorkspaceSelectors.activeItemId)
  const itemsPage = useItemsPage()
  const expandedNoteTreeIds = useSelector(WorkspaceSelectors.expandedNoteTreeIds)
  const usageCapacity = useSelector(NotesSelectors.usageCapacity)
  const maxCapacity = useSelector(SessionSelectors.maxCapacity)
  const usageStorageCapacity = useSelector(NotesSelectors.usageStorageCapacity)
  const maxStorageCapacity = useSelector(SessionSelectors.maxStorageCapacity)
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
          <FlexRow noGrow pa={1}>
            <FavoriteIcon />
            <Label text={{ value: 'Favorites' }} />
          </FlexRow>
        </Link>
        <Link href={recent()}>
          <FlexRow noGrow pa={1}>
            <LogIcon />
            <Label text={{ value: 'Recent' }} />
          </FlexRow>
        </Link>
        <Link href={trash()}>
          <FlexRow noGrow pa={1}>
            <TrashIcon />
            <Label text={{ value: 'Trash' }} />
          </FlexRow>
        </Link>
        <Divider />
        <NoteTree
          folder={root}
          activeId={activeItemId}
          expandedIds={expandedNoteTreeIds}
          onSelect={handleSelectItem}
          onChangeExpanded={handleChangeExpanded}
        />
        <Divider />
        <StorageCapacityView
          usage={usageCapacity}
          max={maxCapacity}
          storageUsage={usageStorageCapacity}
          storageMax={maxStorageCapacity}
        />
      </FlexColumn>
    </FlexColumn>
  )
}
