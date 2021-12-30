import MuiTypography from '@mui/material/Typography'

type LabelVariant = 'body' | 'caption' | 'title' | 'subtitle'

const typographyVariant = (variant: LabelVariant) => {
  switch (variant) {
    case 'body':
      return 'body1'
    case 'caption':
      return 'caption'
    case 'title':
      return 'h5'
    case 'subtitle':
      return 'subtitle1'
  }
}

type LabelProps = {
  variant?: LabelVariant
  children: string
}

export default function Label({ variant, children }: LabelProps) {
  return <MuiTypography variant={typographyVariant(variant)}>{children}</MuiTypography>
}
