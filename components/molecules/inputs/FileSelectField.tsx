import FileDropField from '../../atoms/inputs/FileDropField'
import { FlexColumn } from '../../atoms/layout/Flex'
import { UploadIcon } from '../../atoms/display/Icons'
import Label from '../../atoms/display/Label'
import { useCallback, useState } from 'react'

type FileSelectFieldProps = {
  onSelect: (_files: File[]) => void
}

export default function FileSelectField({ onSelect }: FileSelectFieldProps) {
  const [active, setActive] = useState(false)
  const handleActive = useCallback(
    (state) => {
      setActive(state)
    },
    [setActive]
  )

  return (
    <FileDropField onSelect={onSelect} onActive={handleActive}>
      <FlexColumn justify={'center'} align={'center'} height={320}>
        <UploadIcon size={64} color={active ? 'secondary' : undefined} />
        <Label text={{ value: 'Please drop file' }} />
      </FlexColumn>
    </FileDropField>
  )
}
