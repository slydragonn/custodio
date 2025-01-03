import { PropsWithChildren } from 'react'
import { Callout as RadixCallout } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'

const Callout = ({ children }: PropsWithChildren) => {
  return (
    <RadixCallout.Root variant="outline">
      <RadixCallout.Icon>
        <InfoCircledIcon />
      </RadixCallout.Icon>
      <RadixCallout.Text>{children}</RadixCallout.Text>
    </RadixCallout.Root>
  )
}

export default Callout
