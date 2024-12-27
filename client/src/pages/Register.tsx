import { Flex, Heading, Text } from '@radix-ui/themes'
import SignUpForm from '../components/auth/SignUpForm'
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
        gap="6"
      >
        <Heading as="h1">Create an account</Heading>
        <SignUpForm />
        <Text>
          Already have an account? <NavLink to="/login">Log in</NavLink>
        </Text>
      </Flex>
    </main>
  )
}