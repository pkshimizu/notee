import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import { ReactElement } from 'react'

type BreadcrumbsParams = {
  children: ReactElement | ReactElement[]
}

export default function Breadcrumbs({ children }: BreadcrumbsParams) {
  return <MuiBreadcrumbs>{children}</MuiBreadcrumbs>
}
