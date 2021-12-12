import { ReactNode, useCallback, useState } from 'react'
import Drawer from '../atoms/navigation/Drawer'
import AppBar from '../atoms/surfaces/AppBar'
import UserAvatar from '../molecules/display/UserAvatar'
import Flex from '../atoms/layout/Flex'
import Button from '../atoms/inputs/Button'
import UserMenu from '../organisms/UserMenu'
import { useSelector } from 'react-redux'
import { StoreState } from '../../store'
import { User } from '../../models/user'
import Margin from "../atoms/layout/Margin";

type WorkspaceLayoutProps = {
  sidebar: ReactNode
  children: ReactNode
}

export default function WorkspaceLayout({ sidebar, children }: WorkspaceLayoutProps) {
  const currentUser = useSelector<StoreState, User | undefined>((state) => state.session.currentUser)
  const [menuTarget, setMenuTarget] = useState<Element | undefined>(undefined)
  const handleClickMenu = useCallback((target) => {
    setMenuTarget(target)
  }, [])

  if (currentUser) {
    return (
      <>
        <Drawer open={false}>
          <AppBar>
            <Flex direction={'row'} justify={'flex-end'} align={'center'} width={'100%'}>
              <Button onClick={handleClickMenu} variant={'text'}>
                <UserAvatar user={currentUser} />
              </Button>
            </Flex>
            <UserMenu target={menuTarget} onClose={() => setMenuTarget(undefined)} />
          </AppBar>
          <Flex direction={'column'} justify={'space-between'} height={'100%'} width={256}>
            {sidebar}
          </Flex>
        </Drawer>
        <Margin left={32}>
          {children}
        </Margin>
      </>
    )
  }

  return <></>
}
