import { ReactNode } from 'react'
import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import SettingsMenu from '../organisms/SettingsMenu'
import Container from '../atoms/layout/Container'
import SettingsAppBar from '../organisms/SettingsAppBar'

type SettingsLayoutProps = {
  children: ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <Container>
      <FlexColumn>
        <SettingsAppBar />
        <FlexRow>
          <SettingsMenu />
          {children}
        </FlexRow>
      </FlexColumn>
    </Container>
  )
}
