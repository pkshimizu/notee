import { ReactNode, useCallback } from 'react'
import Drawer from '../atoms/navigation/Drawer'
import { FlexColumn } from '../atoms/layout/Flex'
import WorkspaceAppBar from '../organisms/WorkspaceAppBar'
import WorkspaceSideBar from '../organisms/WorkspaceSideBar'
import { useDispatch, useSelector } from 'react-redux'
import workspaceSlice from '../../store/workspace'
import { openSideBarSelector } from '../../store/workspace/selectors'

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
      <FlexColumn height={'100vh'} space={0} ml={openSideBar ? 32 : 0}>
        {children}
      </FlexColumn>
    </>
  )
}
