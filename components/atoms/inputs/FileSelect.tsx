import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'

type FileSelectProps = {}

export default function FileSelect({}: FileSelectProps) {
  const handleSelect = useCallback((files) => {
    console.log(files)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleSelect })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>ドロップして</p> : <p>ドラッグして</p>}
    </div>
  )
}
