import { ReactNode, useCallback } from 'react'
import Drawer from '../atoms/navigation/Drawer'
import { FlexColumn } from '../atoms/layout/Flex'
import WorkspaceAppBar from '../organisms/WorkspaceAppBar'
import WorkspaceSideBar from '../organisms/WorkspaceSideBar'
import { useDispatch, useSelector } from 'react-redux'
import workspaceSlice from '../../store/workspace'
import { openSideBarSelector } from '../../store/workspace/selectors'
import WorkspaceTabView from '../organisms/WorkspaceTabView'
import { Theme, useMediaQuery } from '@mui/material'

type WorkspaceLayoutProps = {
  children: ReactNode
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const openSideBar = useSelector(openSideBarSelector)
  const dispatch = useDispatch()
  const upSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
  const handleToggleSideBar = useCallback(() => {
    dispatch(workspaceSlice.actions.toggleSideBar())
  }, [dispatch])

  return (
    <>
      <Drawer open={openSideBar} variant={upSm ? 'persistent' : 'temporary'} onClose={handleToggleSideBar}>
        <FlexColumn space={0} height={'100%'} width={256} noWrap>
          <WorkspaceAppBar />
          <WorkspaceSideBar />
        </FlexColumn>
      </Drawer>
      <FlexColumn height={'100vh'} space={0} ml={openSideBar && upSm ? 32 : 0}>
        <WorkspaceTabView />
        {children}
      </FlexColumn>
    </>
  )
}
