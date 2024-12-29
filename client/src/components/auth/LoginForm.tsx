import Input from '../ui/Input'
import { EnterIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import Label from '../ui/Label'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useAuthStore from '../../store/authStore'
import { useNavigate } from 'react-router'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isAuthenticated, login } = useAuthStore((state) => state)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        throw new Error('Missing form data')
      }

      const loginData = {
        email,
        password,
      }

      const response = await fetch('/server/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
      })

      if (response.status == 401) {
        throw new Error('Unauthorized')
      }

      const json = await response.json()
      const token = json.token

      login(token)
      navigate('/')
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <Flex direction="column">
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="email@example.com"
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="password">Master Password</Label>
        <Input
          placeholder="Your secret password"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="classic"
          style={{ cursor: 'pointer' }}
          onClick={handleLogin}
        >
          Log in <EnterIcon />
        </Button>
      </Flex>
      <Toaster position="bottom-right" />
    </>
  )
}
