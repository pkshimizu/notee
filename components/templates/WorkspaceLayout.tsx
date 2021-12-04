import { ReactNode, useCallback, useContext, useState } from 'react'
import Drawer from '../atoms/navigation/Drawer'
import AppBar from '../atoms/surfaces/AppBar'
import { AuthContext } from '../systems/Auth'
import UserImage from '../molecules/display/UserImage'
import Flex from '../atoms/layout/Flex'
import Button from '../atoms/inputs/Button'
import UserMenu from '../organisms/UserMenu'

type WorkspaceLayoutProps = {
  sidebar: ReactNode
  children: ReactNode
}

export default function WorkspaceLayout({ sidebar, children }: WorkspaceLayoutProps) {
  const { currentUser } = useContext(AuthContext)
  const [menuTarget, setMenuTarget] = useState<Element | undefined>(undefined)
  const handleClickMenu = useCallback((target) => {
    setMenuTarget(target)
  }, [])

  if (currentUser) {
    return (
      <>
        <Drawer open={false}>
          <AppBar>
            <Button onClick={handleClickMenu} variant={'text'}>
              <UserImage user={currentUser} />
            </Button>
            <UserMenu target={menuTarget} onClose={() => setMenuTarget(undefined)} />
          </AppBar>
          <Flex direction={'column'} justify={'space-between'} height={'100%'}>
            {sidebar}
          </Flex>
        </Drawer>
        {children}
      </>
    )
  }

  return <></>
}
