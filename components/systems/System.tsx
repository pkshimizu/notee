import { useCallback } from 'react'
import Snackbar from '../atoms/feedback/Snackbar'
import { useDispatch, useSelector } from 'react-redux'
import systemSlice from '../../store/system'
import Head from 'next/head'
import { useTitle } from '../../hooks/useTitle'
import LoadingLayer from '../molecules/feedback/LoadingLayer'
import { Component } from '../../types/react'
import SystemSelectors from '../../store/system/selectors'

type SystemProps = {
  children: Component
}

export default function System({ children }: SystemProps) {
  const { title } = useTitle()
  const message = useSelector(SystemSelectors.systemMessage)
  const error = useSelector(SystemSelectors.error)
  const loading = useSelector(SystemSelectors.loading)
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
          message={{ value: `${error.message}(${error.code})`, plain: true }}
          severity={'error'}
          onClose={handleCloseError}
        />
      )}
      {message && <Snackbar open={true} message={message} severity={'success'} onClose={handleCloseMessage} />}
      <LoadingLayer open={loading} />
    </>
  )
}
