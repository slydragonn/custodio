import { Flex, Heading, Text } from '@radix-ui/themes'
import SignUpForm from '@/components/auth/SignUpForm'
import { NavLink } from 'react-router'

export default function Register() {
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
            Create an account
          </Heading>
          <SignUpForm />
          <Text align="center" size="2">
            Already have an account? <NavLink to="/login">Log in</NavLink>
          </Text>
        </Flex>
      </Flex>
    </main>
  )
}
