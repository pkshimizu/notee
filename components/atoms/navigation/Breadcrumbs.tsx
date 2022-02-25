import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import { Component } from '../../../types/react'

type BreadcrumbsParams = {
  children: Component
}

export default function Breadcrumbs({ children }: BreadcrumbsParams) {
  return <MuiBreadcrumbs>{children}</MuiBreadcrumbs>
}
