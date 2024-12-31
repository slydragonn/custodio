import Navbar from '@/components/nav/Navbar'
import { Flex } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

const DesktopLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex width="100%" height="100vh" gap="2" align="start">
      <Navbar />
      {children}
    </Flex>
  )
}

export default DesktopLayout
