import { useDropzone } from 'react-dropzone'
import { useEffect } from 'react'
import MuiBox from '@mui/material/Box'
import { Component } from '../../../types/react'

type FileSelectProps = {
  onSelect: (_files: File[]) => void
  onActive?: (_active: boolean) => void
  children: Component
}

export default function FileDropField({ onSelect, onActive, children }: FileSelectProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onSelect })
  useEffect(() => {
    if (onActive) {
      onActive(isDragActive)
    }
  }, [isDragActive, onActive])

  return (
    <MuiBox {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </MuiBox>
  )
}
