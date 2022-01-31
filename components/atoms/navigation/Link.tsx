import { ReactNode } from 'react'
import MuiLink from '@mui/material/Link'
import NextLink from 'next/link'

type LinkProps = {
  href: string
  children: ReactNode
}

export default function Link({ href, children }: LinkProps) {
  const external = href.startsWith('http')
  if (external) {
    return (
      <MuiLink href={href} rel={'noopener'} sx={{ textDecoration: 'none' }}>
        {children}
      </MuiLink>
    )
  }

  return (
    <NextLink href={href} passHref>
      <MuiLink sx={{ textDecoration: 'none' }}>{children}</MuiLink>
    </NextLink>
  )
}
