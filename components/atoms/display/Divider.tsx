import MuiDivider from '@mui/material/Divider'

type DividerProps = {
  vertical?: boolean
}

export default function Divider({ vertical }: DividerProps) {
  return <MuiDivider orientation={vertical ? 'vertical' : 'horizontal'} />
}
