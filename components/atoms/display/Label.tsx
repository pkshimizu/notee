import MuiTypography from '@mui/material/Typography'
import { useLocale } from '../../../hooks/useLocale'

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
  text?: string
  defaultText?: string
  args?: { [key: string]: string | number }
  plain?: boolean
}

export default function Label({ variant = 'body', defaultText = 'undefined', text, args, plain }: LabelProps) {
  const { t } = useLocale()
  if (text) {
    const translatedText = plain ? text : t(text, args)

    return <MuiTypography variant={typographyVariant(variant)}>{translatedText}</MuiTypography>
  } else {
    const translatedText = t(defaultText, args)

    return <MuiTypography variant={typographyVariant(variant)}>{translatedText}</MuiTypography>
  }
}
