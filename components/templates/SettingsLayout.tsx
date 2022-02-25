import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import SettingsMenu from '../organisms/SettingsMenu'
import Container from '../atoms/layout/Container'
import SettingsAppBar from '../organisms/SettingsAppBar'
import LocaleSelectLink from '../organisms/LocaleSelectLink'
import { usePath } from '../../hooks/usePath'
import { Component } from '../../types/react'

type SettingsLayoutProps = {
  children: Component
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const { current } = usePath()

  return (
    <Container>
      <FlexColumn>
        <FlexRow>
          <SettingsAppBar />
        </FlexRow>
        <LocaleSelectLink path={current()} />
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
