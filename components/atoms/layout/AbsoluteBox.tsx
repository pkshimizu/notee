import { useEffect, useRef } from 'react'
import MuiBox from '@mui/material/Box'
import { Component } from '../../../types/react'

type AbsoluteBoxProps = {
  top?: string | number
  left?: string | number
  right?: string | number
  bottom?: string | number
  hidden?: boolean
  onResize?: (_width: number, _height: number) => void
  children: Component
}

export default function AbsoluteBox({ top, left, right, bottom, hidden, onResize, children }: AbsoluteBoxProps) {
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
      hidden={hidden}
    >
      {children}
    </MuiBox>
  )
}
