import Input from '../ui/Input'
import { EnterIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'

export default function LoginForm() {
  return (
    <Flex direction="column">
      <label htmlFor="email">Email</label>
      <Input placeholder="email@example.com" type="email" id="email" />
      <label htmlFor="password">Master Password</label>
      <Input placeholder="Your secret password" type="password" id="password" />
      <Button style={{ cursor: 'pointer' }}>
        Log in <EnterIcon />
      </Button>
    </Flex>
  )
}
