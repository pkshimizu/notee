import { ReactNode } from 'react'
import { FlexColumn, FlexRow } from '../../atoms/layout/Flex'
import RelativeBox from '../../atoms/layout/RelativeBox'
import AbsoluteBox from '../../atoms/layout/AbsoluteBox'
import Drawer from '../../atoms/navigation/Drawer'
import { Theme, useMediaQuery } from '@mui/material'

type WorkspaceTabPanelProps = {
  menu: ReactNode
  propertiesPanel?: ReactNode
  children: ReactNode
  onResize?: (_width: number, _height: number) => void
  onClosePropertiesPanel?: () => void
}

export default function WorkspaceTabPanel({
  menu,
  propertiesPanel,
  children,
  onResize,
  onClosePropertiesPanel,
}: WorkspaceTabPanelProps) {
  const upSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

  return (
    <FlexColumn space={0} width={propertiesPanel && upSm ? 'calc(100% - 256px)' : '100%'}>
      {menu}
      <FlexRow>
        <RelativeBox width={'100%'} height={'100%'}>
          <AbsoluteBox top={0} bottom={0} left={0} right={0} onResize={onResize}>
            {children}
          </AbsoluteBox>
        </RelativeBox>
      </FlexRow>
      <Drawer
        open={propertiesPanel !== undefined}
        anchor={'right'}
        variant={upSm ? 'persistent' : 'temporary'}
        onClose={onClosePropertiesPanel}
      >
        <FlexColumn width={256}>{propertiesPanel}</FlexColumn>
      </Drawer>
    </FlexColumn>
  )
}
