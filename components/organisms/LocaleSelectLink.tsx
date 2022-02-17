import { FlexRow } from '../atoms/layout/Flex'
import Label from '../atoms/display/Label'
import Link from '../atoms/navigation/Link'
import Image from '../atoms/display/Image'

type LocaleSelectLinkProps = {
  path: string
}

export default function LocaleSelectLink({ path }: LocaleSelectLinkProps) {
  return (
    <FlexRow align={'center'}>
      <Label text={{ value: 'Language' }} />
      <Link href={path} locale={'ja'}>
        <Image url={'/images/flags/Japan.png'} alt={'Japanese'} width={32} height={32} />
      </Link>
      <Link href={path} locale={'en'}>
        <Image url={'/images/flags/America.png'} alt={'English'} width={32} height={32} />
      </Link>
    </FlexRow>
  )
}
