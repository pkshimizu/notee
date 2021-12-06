import MuiTypography from '@mui/material/Typography'

type LabelProps = {
  children: string
}

export default function Label({ children }: LabelProps) {
  return <MuiTypography>{children}</MuiTypography>
}
