import { ReactNode, useCallback } from 'react'
import Snackbar from '../atoms/feedback/Snackbar'
import { useDispatch, useSelector } from 'react-redux'
import systemSlice from '../../store/system'
import { errorSelector, loadingSelector, systemMessageSelector } from '../../store/system/selectors'
import Head from 'next/head'
import { useTitle } from '../../hooks/useTitle'
import LoadingLayer from '../molecules/feedback/LoadingLayer'

type SystemProps = {
  children: ReactNode
}

export default function System({ children }: SystemProps) {
  const { title } = useTitle()
  const message = useSelector(systemMessageSelector)
  const error = useSelector(errorSelector)
  const loading = useSelector(loadingSelector)
  const dispatch = useDispatch()
  const handleCloseMessage = useCallback(() => {
    dispatch(systemSlice.actions.clearMessage())
  }, [dispatch])
  const handleCloseError = useCallback(() => {
    dispatch(systemSlice.actions.clearError())
  }, [dispatch])

  return (
    <>
      <Head>
        <title>notee{title && ` | ${title}`}</title>
      </Head>
      {children}
      {error && (
        <Snackbar
          open={true}
          message={`${error.message}(${error.code})`}
          severity={'error'}
          onClose={handleCloseError}
        />
      )}
      {message && <Snackbar open={true} message={message} severity={'success'} onClose={handleCloseMessage} />}
      <LoadingLayer open={loading} />
    </>
  )
}
