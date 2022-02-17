import { ReactElement } from 'react'
import MuiLink from '@mui/material/Link'
import NextLink from 'next/link'

type LinkProps = {
  href: string
  locale?: 'ja' | 'en'
  children: ReactElement
}

export default function Link({ href, locale, children }: LinkProps) {
  const external = href.startsWith('http')
  if (external) {
    return (
      <MuiLink href={href} rel={'noopener'} sx={{ textDecoration: 'none' }}>
        {children}
      </MuiLink>
    )
  }

  return (
    <NextLink href={href} locale={locale} passHref>
      <MuiLink sx={{ textDecoration: 'none' }}>{children}</MuiLink>
    </NextLink>
  )
}
