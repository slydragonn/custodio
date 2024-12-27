import { Flex, Heading, Text } from '@radix-ui/themes'
import { NavLink } from 'react-router'
import LoginForm from '../components/auth/LoginForm'

export default function Login() {
  return (
    <main>
      <Flex
        direction="column"
        justify="center"
        align="center"
        p="2"
        width="100vw"
        height="100vh"
        gap="6"
      >
        <Heading as="h1">Login</Heading>
        <LoginForm />
        <Text>
          Don't have an account?{' '}
          <NavLink to="/register">Create an account</NavLink>
        </Text>
      </Flex>
    </main>
  )
}
