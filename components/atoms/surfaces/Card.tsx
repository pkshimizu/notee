import MuiCard from '@mui/material/Card'
import MuiCardHeader from '@mui/material/CardHeader'
import MuiCardContent from '@mui/material/CardContent'
import MuiCardActions from '@mui/material/CardActions'
import { ReactNode } from 'react'


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
  header?: ReactNode
  children: ReactNode
  actions?: ReactNode
  size?: CardSize
}

export default function Card({ header, children, actions, size = 'md' }: CardProps) {
  return (
    <MuiCard sx={{width: width(size)}}>
      {header && <MuiCardHeader title={header}/>}
      <MuiCardContent>{children}</MuiCardContent>
      {actions && <MuiCardActions>{actions}</MuiCardActions>}
    </MuiCard>
  )
}
