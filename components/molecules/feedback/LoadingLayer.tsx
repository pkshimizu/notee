import Backdrop from '../../atoms/feedback/Backdrop'
import Loading from '../../atoms/feedback/Loading'

type LoadingLayerProps = {
  open: boolean
}

export default function LoadingLayer({ open }: LoadingLayerProps) {
  return (
    <Backdrop open={open}>
      <Loading />
    </Backdrop>
  )
}
