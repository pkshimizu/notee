import { Diff, diff_match_patch } from 'diff-match-patch'
import { useEffect, useState } from 'react'
import MuiBox from '@mui/material/Box'
import MuiTypography from '@mui/material/Typography'
import theme from '../../../styles/theme'

type DiffViewProps = {
  content1: string
  content2: string
}

export default function DiffView({ content1, content2 }: DiffViewProps) {
  const [diffs, setDiffs] = useState<Diff[]>([])
  useEffect(() => {
    const dmp = new diff_match_patch()
    const diff = dmp.diff_main(content1, content2)
    dmp.diff_cleanupEfficiency(diff)
    setDiffs(diff)
  }, [content1, content2, setDiffs])

  return (
    <MuiBox sx={{ whiteSpace: 'pre-line' }}>
      {diffs.map((diff) => {
        const type = diff[0]
        const text = diff[1]
        if (type === -1) {
          return (
            <MuiTypography
              sx={{
                display: 'inline',
                bgcolor: theme.palette.secondary.light,
                textDecoration: 'line-through',
                wordBreak: 'break-word',
              }}
            >
              {text}
            </MuiTypography>
          )
        }
        if (type === 0) {
          return (
            <MuiTypography
              sx={{
                display: 'inline',
                wordBreak: 'break-word',
              }}
            >
              {text}
            </MuiTypography>
          )
        }
        if (type === 1) {
          return (
            <MuiTypography
              sx={{
                display: 'inline',
                bgcolor: theme.palette.primary.light,
                wordBreak: 'break-word',
              }}
            >
              {text}
            </MuiTypography>
          )
        }
      })}
    </MuiBox>
  )
}
