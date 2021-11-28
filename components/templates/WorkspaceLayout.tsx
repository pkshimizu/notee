import { ReactNode, useContext } from 'react'
import Drawer from '../atoms/navigation/Drawer'
import AppBar from '../atoms/surfaces/AppBar'
import { AuthContext } from '../systems/Auth'
import UserImage from '../molecules/display/UserImage'
import Flex from '../atoms/layout/FlexRow'
import UserNameText from '../molecules/display/UserNameText'

type WorkspaceLayoutProps = {
  sidebar: ReactNode
  children: ReactNode
}

export default function WorkspaceLayout({ sidebar, children }: WorkspaceLayoutProps) {
  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return (
      <>
        <Drawer open={false}>
          <AppBar>
            <Flex direction={'row'} align={'center'}>
              <UserImage user={currentUser} />
              <UserNameText user={currentUser} />
            </Flex>
          </AppBar>
          {sidebar}
        </Drawer>
        {children}
      </>
    )
  }

  return <></>
}
