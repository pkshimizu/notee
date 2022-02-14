import { ReactElement } from 'react'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import SettingsMenu from '../organisms/SettingsMenu'
import Container from '../atoms/layout/Container'
import SettingsAppBar from '../organisms/SettingsAppBar'

type SettingsLayoutProps = {
  children: ReactElement | ReactElement[]
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <Container>
      <FlexColumn>
        <SettingsAppBar />
        <FlexRow>
          <FlexColumn noGrow>
            <SettingsMenu />
          </FlexColumn>
          <FlexColumn width={'calc(100% - 208px)'}>{children}</FlexColumn>
        </FlexRow>
      </FlexColumn>
    </Container>
  )
}
