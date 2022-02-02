import { FlexColumn, FlexRow } from '../components/atoms/layout/Flex'
import Label from '../components/atoms/display/Label'
import Link from '../components/atoms/navigation/Link'
import Image from '../components/atoms/display/Image'

export default function Error404() {
  return (
    <FlexColumn align={'center'} height={'100vh'} width={'100%'}>
      <FlexRow align={'center'}>
        <Image url={'/logo.svg'} alt={'logo'} width={128} height={170} />
        <FlexColumn>
          <FlexColumn space={0}>
            <Label variant={'title'}>404</Label>
            <Label variant={'caption'}>Not Found Page</Label>
          </FlexColumn>
          <Link href={'/'}>Back to Home</Link>
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  )
}
