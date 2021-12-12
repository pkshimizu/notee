import MuiBox from "@mui/material/Box";
import {ReactNode} from "react";

type MarginProps = {
  top?: number
  bottom?: number
  left?: number
  right?: number
  children: ReactNode
}

export default function Margin({top, bottom, left, right, children}: MarginProps) {
  return (
    <MuiBox sx={{mt:top, mb:bottom, ml:left, mr:right}}>
      {children}
    </MuiBox>
  )
}
