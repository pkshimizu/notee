import {ReactNode} from "react";
import MuiIconButton from "@mui/material/IconButton"

type IconButtonProps = {
  children: ReactNode
  onClick: () => void
}

export default function IconButton({children, onClick}: IconButtonProps) {
  return (
    <MuiIconButton onClick={onClick}>
      {children}
    </MuiIconButton>
  )
}
