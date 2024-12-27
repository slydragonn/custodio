import Input from '../ui/Input'
import { EnterIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'

export default function SignUpForm() {
  return (
    <Flex direction="column">
      <label htmlFor="username">Username</label>
      <Input placeholder="Your name" id="username" />
      <label htmlFor="email">Email</label>
      <Input placeholder="email@example.com" type="email" id="email" />
      <label htmlFor="password">Master Password</label>
      <Input placeholder="Your secret password" type="password" id="password" />
      <Button style={{ cursor: 'pointer' }}>
        Sign Up <EnterIcon />
      </Button>
    </Flex>
  )
}