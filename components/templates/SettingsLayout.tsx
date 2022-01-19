import { ReactNode } from 'react'
import { FlexRow } from '../atoms/layout/Flex'
import SettingsMenu from '../organisms/SettingsMenu'

type SettingsLayoutProps = {
  children: ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <FlexRow>
      <SettingsMenu />
      {children}
    </FlexRow>
  )
}
