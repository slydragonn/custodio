import Input from '../ui/Input'
import { EnterIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import Label from '../ui/Label'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import useAuthStore from '../../store/authStore'
import { useNavigate } from 'react-router'
import { UserRegister } from '../../types/user'

export default function SignUpForm() {
  const [name, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isAuthenticated } = useAuthStore((state) => state)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async () => {
    try {
      if (!name || !email || !password) {
        throw new Error('Missing form data')
      }

      const registerData: UserRegister = {
        name,
        email,
        password,
      }

      const response = await fetch('/server/register', {
        method: 'POST',
        body: JSON.stringify(registerData),
      })
      if (!response.ok) {
        const json = await response.json()
        throw new Error(`Server: ${json.error}`)
      }

      const json = await response.json()
      console.log(json)
      toast.success(json.message)
    } catch (error) {
      console.error(error)
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <Flex direction="column">
        <Label htmlFor="username">Username</Label>
        <Input
          placeholder="Your name"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
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
          onClick={handleSubmit}
        >
          Sign Up <EnterIcon />
        </Button>
      </Flex>
      <Toaster position="bottom-right" />
    </>
  )
}
