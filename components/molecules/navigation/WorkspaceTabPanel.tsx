import { ReactNode } from 'react'
import { FlexColumn, FlexRow } from '../../atoms/layout/Flex'
import RelativeBox from '../../atoms/layout/RelativeBox'
import AbsoluteBox from '../../atoms/layout/AbsoluteBox'

type WorkspaceTabPanelProps = {
  value: string
  menu: ReactNode
  propertiesPanel?: ReactNode
  children: ReactNode
  onResize?: (_width: number, _height: number) => void
}

export default function WorkspaceTabPanel({
  value,
  menu,
  propertiesPanel,
  children,
  onResize,
}: WorkspaceTabPanelProps) {
  return (
    <FlexColumn space={0} height={'100%'}>
      {menu}
      <FlexRow>
        <RelativeBox width={'100%'} height={'100%'}>
          <AbsoluteBox top={0} bottom={0} left={0} right={propertiesPanel ? 256 : 0} onResize={onResize}>
            {children}
          </AbsoluteBox>
          <AbsoluteBox
            top={0}
            bottom={0}
            left={propertiesPanel ? 'calc(100% - 256px)' : '100%'}
            right={0}
            onResize={onResize}
          >
            {propertiesPanel}
          </AbsoluteBox>
        </RelativeBox>
      </FlexRow>
    </FlexColumn>
  )
}
