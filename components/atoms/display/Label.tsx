import MuiTypography from '@mui/material/Typography'
import { LabelText, useLocale } from '../../../hooks/useLocale'

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
  text: LabelText
}

export default function Label({ variant = 'body', text }: LabelProps) {
  const { t } = useLocale()
  const translatedText = t(text)

  return <MuiTypography variant={typographyVariant(variant)}>{translatedText}</MuiTypography>
}
