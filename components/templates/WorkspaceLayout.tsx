import { ReactNode, useCallback, useState } from 'react'
import Drawer from '../atoms/navigation/Drawer'
import AppBar from '../atoms/surfaces/AppBar'
import UserAvatar from '../molecules/display/UserAvatar'
import Flex, { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import Button from '../atoms/inputs/Button'
import UserMenu from '../organisms/UserMenu'
import { useSelector } from 'react-redux'
import Margin from '../atoms/layout/Margin'
import { currentUserSelector } from '../../store/session'

type WorkspaceLayoutProps = {
  sidebar: ReactNode
  openSideBar: boolean
  children: ReactNode
  onCloseSideBar: () => void
}

export default function WorkspaceLayout({ sidebar, openSideBar, children, onCloseSideBar }: WorkspaceLayoutProps) {
  const currentUser = useSelector(currentUserSelector)
  const [menuTarget, setMenuTarget] = useState<Element | undefined>(undefined)
  const handleClickMenu = useCallback((target) => {
    setMenuTarget(target)
  }, [])

  if (currentUser) {
    return (
      <>
        <Drawer open={openSideBar} onClose={onCloseSideBar}>
          <AppBar>
            <FlexRow justify={'flex-end'} align={'center'} width={'100%'}>
              <Button onClick={handleClickMenu} variant={'text'}>
                <UserAvatar user={currentUser} />
              </Button>
            </FlexRow>
            <UserMenu target={menuTarget} onClose={() => setMenuTarget(undefined)} />
          </AppBar>
          <FlexColumn justify={'space-between'} height={'100%'} width={256}>
            {sidebar}
          </FlexColumn>
        </Drawer>
        <Margin left={openSideBar ? 32 : 0}>{children}</Margin>
      </>
    )
  }

  return <></>
}
