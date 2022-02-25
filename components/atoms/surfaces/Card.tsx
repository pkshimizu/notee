import MuiCard from '@mui/material/Card'
import MuiCardHeader from '@mui/material/CardHeader'
import MuiCardContent from '@mui/material/CardContent'
import MuiCardActions from '@mui/material/CardActions'
import { Component } from '../../../types/react'

type CardSize = 'sm' | 'md' | 'lg'

const width = (size: CardSize) => {
  switch (size) {
  case 'sm':
    return 240
  case 'md':
    return 360
  case 'lg':
    return 480
  }
}

type CardProps = {
  header?: Component
  children: Component
  actions?: Component
  size?: CardSize
}

export default function Card({ header, children, actions, size = 'md' }: CardProps) {
  return (
    <MuiCard sx={{ width: width(size), marginBottom: 1 }}>
      {header && <MuiCardHeader title={header} />}
      <MuiCardContent>{children}</MuiCardContent>
      {actions && <MuiCardActions>{actions}</MuiCardActions>}
    </MuiCard>
  )
}
