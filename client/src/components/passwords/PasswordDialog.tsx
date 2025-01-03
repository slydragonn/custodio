import { PasswordForm } from '@/types/passwords'
import { PlusIcon } from '@radix-ui/react-icons'
import {
  Dialog,
  Flex,
  IconButton,
  Text,
  TextField,
  Button,
  TextArea,
} from '@radix-ui/themes'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  savePassword: (password: PasswordForm) => Promise<void>
}

const PasswordDialog = ({ savePassword }: Props) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [website, setWebsite] = useState('')
  const [note, setNote] = useState('')

  const handleClick = () => {
    if (!name || !username || !password || !website || !note) {
      toast.error('Missing form data')
      return
    }
    const newPassword: PasswordForm = {
      name,
      username,
      password,
      website,
      note,
      favorite: false,
    }

    savePassword(newPassword)
  }

  const resetState = () => {
    setName('')
    setUsername('')
    setPassword('')
    setWebsite('')
    setNote('')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton>
          <PlusIcon />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add new password</Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              placeholder="John's password"
              maxLength={50}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Username
            </Text>
            <TextField.Root
              placeholder="john@example.com"
              maxLength={50}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              placeholder="password123"
              maxLength={100}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Website
            </Text>
            <TextField.Root
              placeholder="https://example.com"
              maxLength={50}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Note
            </Text>
            <TextArea
              placeholder="Your notes"
              maxLength={200}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={resetState}>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleClick}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default PasswordDialog
