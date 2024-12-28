import Input from '../ui/Input'
import { EnterIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import Label from '../ui/Label'

export default function SignUpForm() {
  return (
    <Flex direction="column">
      <Label htmlFor="username">Username</Label>
      <Input placeholder="Your name" id="username" />
      <Label htmlFor="email">Email</Label>
      <Input placeholder="email@example.com" type="email" id="email" />
      <Label htmlFor="password">Master Password</Label>
      <Input placeholder="Your secret password" type="password" id="password" />
      <Button variant="classic" style={{ cursor: 'pointer' }}>
        Sign Up <EnterIcon />
      </Button>
    </Flex>
  )
}
