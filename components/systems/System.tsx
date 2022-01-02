import { ReactNode, useCallback } from 'react'
import Snackbar from '../atoms/feedback/Snackbar'
import { useDispatch, useSelector } from 'react-redux'
import systemSlice, { errorSelector } from '../../store/system'

type SystemProps = {
  children: ReactNode
}

export default function System({ children }: SystemProps) {
  const error = useSelector(errorSelector)
  const dispatch = useDispatch()
  const handleCloseError = useCallback(() => {
    dispatch(systemSlice.actions.clearError())
  }, [dispatch])
  
  return (
    <>
      {children}
      {error && <Snackbar open={true} message={error.message} severity={'error'} onClose={handleCloseError} />}
    </>
  )
}
