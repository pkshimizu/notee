import { ReactElement, useEffect, useRef } from 'react'
import MuiBox from '@mui/material/Box'

type AbsoluteBoxProps = {
  top?: string | number
  left?: string | number
  right?: string | number
  bottom?: string | number
  onResize?: (_width: number, _height: number) => void
  children: ReactElement | ReactElement[]
}

export default function AbsoluteBox({ top, left, right, bottom, onResize, children }: AbsoluteBoxProps) {
  const ref = useRef<HTMLDivElement>()
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width
      const height = entries[0].contentRect.height
      onResize && onResize(width, height)
    })
    ref.current && resizeObserver.observe(ref.current)
  })

  return (
    <MuiBox
      {...{ ref: ref }}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      position={'absolute'}
      boxSizing={'border-box'}
    >
      {children}
    </MuiBox>
  )
}
