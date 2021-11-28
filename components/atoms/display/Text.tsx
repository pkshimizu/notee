import MuiTypography from '@mui/material/Typography'

type TextProps = {
  children: string
}

export default function Text({ children }: TextProps) {
  return <MuiTypography>{children}</MuiTypography>
}
