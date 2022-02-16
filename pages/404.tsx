import { FlexColumn, FlexRow } from '../components/atoms/layout/Flex'
import Label from '../components/atoms/display/Label'
import Link from '../components/atoms/navigation/Link'
import Image from '../components/atoms/display/Image'
import { usePath } from '../hooks/usePath'

export default function Error404() {
  const { root } = usePath()

  return (
    <FlexColumn align={'center'} height={'100vh'} width={'100%'}>
      <FlexRow align={'center'}>
        <Image url={'/logo.svg'} alt={'logo'} width={128} height={170} />
        <FlexColumn>
          <FlexColumn space={0}>
            <Label variant={'title'} text={{ value: '404' }} />
            <Label variant={'caption'} text={{ value: 'Not Found Page' }} />
          </FlexColumn>
          <Link href={root()}>
            <Label text={{ value: 'Back to Home' }} />
          </Link>
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  )
}
