import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import { StorageIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import CapacityProgress from '../molecules/feedback/CapacityProgress'
import CapacityLabel from '../molecules/display/CapacityLabel'

type StorageCapacityViewProps = {
  usage: number
  max: number
  storageUsage: number
  storageMax: number
}

export default function StorageCapacityView({ usage, max, storageUsage, storageMax }: StorageCapacityViewProps) {
  return (
    <FlexColumn px={2} noGrow noWrap height={160}>
      <FlexRow align={'center'}>
        <StorageIcon />
        <Label text={{ value: 'Storage Capacity' }} variant={'caption'} />
      </FlexRow>
      <FlexColumn space={0} noWrap>
        <Label text={{ value: 'Data' }} variant={'caption'} />
        <CapacityProgress value={usage} max={max} />
        <FlexRow>
          <CapacityLabel bytes={usage} />
          <Label text={{ value: '/', plain: true }} />
          <CapacityLabel bytes={max} />
        </FlexRow>
      </FlexColumn>
      <FlexColumn space={0} noWrap>
        <Label text={{ value: 'File' }} variant={'caption'} />
        <CapacityProgress value={storageUsage} max={storageMax} />
        <FlexRow>
          <CapacityLabel bytes={storageUsage} />
          <Label text={{ value: '/', plain: true }} />
          <CapacityLabel bytes={storageMax} />
        </FlexRow>
      </FlexColumn>
    </FlexColumn>
  )
}
