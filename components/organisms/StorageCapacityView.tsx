import { FlexColumn, FlexRow } from '../atoms/layout/Flex'
import { StorageIcon } from '../atoms/display/Icons'
import Label from '../atoms/display/Label'
import CapacityProgress from '../molecules/feedback/CapacityProgress'
import CapacityLabel from '../molecules/display/CapacityLabel'

type StorageCapacityViewProps = {
  usage: number
  max: number
}

export default function StorageCapacityView({ usage, max }: StorageCapacityViewProps) {
  return (
    <FlexColumn pa={2} noGrow>
      <FlexRow align={'center'}>
        <StorageIcon />
        <Label text={{ value: 'Storage Capacity' }} variant={'caption'} />
      </FlexRow>
      <CapacityProgress value={usage} max={max} />
      <FlexRow>
        <CapacityLabel bytes={usage} />
        <Label text={{ value: '/', plain: true }} />
        <CapacityLabel bytes={max} />
      </FlexRow>
    </FlexColumn>
  )
}
