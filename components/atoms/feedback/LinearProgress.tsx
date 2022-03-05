import MuiLinearProgress from '@mui/material/LinearProgress'
import { Color } from '../../../types/mui'

type ProgressProps = {
  variant?: 'determinate'
  value?: number
  color?: Color
}

export default function LinearProgress({ value, variant, color }: ProgressProps) {
  return <MuiLinearProgress value={value} variant={variant} color={color} />
}
