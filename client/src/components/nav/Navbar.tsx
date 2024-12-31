import useAuthStore from '@/store/authStore'
import { ExitIcon, HomeIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text, Theme } from '@radix-ui/themes'
import { NavLink } from 'react-router'

const Navbar = () => {
  const { logout } = useAuthStore()

  return (
    <Theme appearance="dark">
      <Flex
        width="250px"
        height="100vh"
        direction="column"
        gap="6"
        p="6"
        align="start"
      >
        <Text size="4">Custodio</Text>
        <NavLink to="/">
          <Button variant="ghost" size="3">
            <HomeIcon />
            Home
          </Button>
        </NavLink>
        <NavLink to="/passwords">
          <Button variant="ghost" size="3">
            <LockClosedIcon />
            Passwords
          </Button>
        </NavLink>
        <Button variant="ghost" size="3" onClick={logout}>
          <ExitIcon /> Log out
        </Button>
      </Flex>
    </Theme>
  )
}

export default Navbar
