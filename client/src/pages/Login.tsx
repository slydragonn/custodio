import { Flex, Heading, Text } from '@radix-ui/themes'
import { NavLink } from 'react-router'
import LoginForm from '@/components/auth/LoginForm'

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
      >
        <Flex
          width={{ initial: 'auto', xs: '350px' }}
          direction="column"
          gap="4"
          p="6"
          style={{
            boxShadow: 'var(--shadow-6)',
            borderRadius: 'var(--radius-2)',
          }}
        >
          <Heading as="h1" align="center">
            Login
          </Heading>
          <LoginForm />
          <Text align="center" size="2">
            Don't have an account?{' '}
            <NavLink to="/register">Create an account</NavLink>
          </Text>
        </Flex>
      </Flex>
    </main>
  )
}
