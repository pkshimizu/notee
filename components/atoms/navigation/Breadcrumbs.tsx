import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import { ReactNode } from 'react'

type BreadcrumbsParams = {
  children: ReactNode
}

export default function Breadcrumbs({ children }: BreadcrumbsParams) {
  return <MuiBreadcrumbs>{children}</MuiBreadcrumbs>
}
