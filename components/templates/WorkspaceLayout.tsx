import { ReactNode } from 'react'
import Drawer from '../atoms/navigation/Drawer'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import Margin from '../atoms/layout/Margin'

type WorkspaceLayoutProps = {
  appbar: ReactNode
  sidebar: ReactNode
  openSideBar: boolean
  children: ReactNode
  onCloseSideBar: () => void
}

export default function WorkspaceLayout({
  appbar,
  sidebar,
  openSideBar,
  children,
  onCloseSideBar,
}: WorkspaceLayoutProps) {
  return (
    <>
      <Drawer open={openSideBar} onClose={onCloseSideBar}>
        <FlexColumn space={0} height={'100%'} width={256} noWrap>
          {appbar}
          {sidebar}
        </FlexColumn>
      </Drawer>
      <Margin left={openSideBar ? 32 : 0}>{children}</Margin>
    </>
  )
}
