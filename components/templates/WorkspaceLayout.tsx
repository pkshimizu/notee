import { ReactNode, useCallback } from 'react'
import Drawer from '../atoms/navigation/Drawer'
import { FlexColumn } from '../atoms/layout/Flex'
import Margin from '../atoms/layout/Margin'
import WorkspaceAppBar from '../organisms/WorkspaceAppBar'
import WorkspaceSideBar from '../organisms/WorkspaceSideBar'
import { useDispatch, useSelector } from 'react-redux'
import workspaceSlice, { openSideBarSelector } from '../../store/workspace'

type WorkspaceLayoutProps = {
  children: ReactNode
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const openSideBar = useSelector(openSideBarSelector)
  const dispatch = useDispatch()
  const handleToggleSideBar = useCallback(() => {
    dispatch(workspaceSlice.actions.toggleSideBar())
  }, [dispatch])
  
  return (
    <>
      <Drawer open={openSideBar} onClose={handleToggleSideBar}>
        <FlexColumn space={0} height={'100%'} width={256} noWrap>
          <WorkspaceAppBar />
          <WorkspaceSideBar />
        </FlexColumn>
      </Drawer>
      <Margin left={openSideBar ? 32 : 0}>
        <FlexColumn height={'100vh'} space={0}>
          {children}
        </FlexColumn>
      </Margin>
    </>
  )
}
