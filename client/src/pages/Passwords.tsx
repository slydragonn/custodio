import DesktopLayout from '@/layouts/Desktop'
import useAuthStore from '@/store/authStore'
import usePasswordStore from '@/store/passwordStore'
import { PasswordData } from '@/types/passwords'
import { defaultDateFormat } from '@/utils/date-format'
import {
  CopyIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
  Pencil1Icon,
  PlusIcon,
  ResetIcon,
  StarFilledIcon,
  StarIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import {
  Badge,
  Box,
  Callout,
  Card,
  Code,
  DataList,
  Flex,
  IconButton,
  ScrollArea,
  Spinner,
  Text,
  TextField,
  Tooltip,
  Link,
  Blockquote,
  DropdownMenu,
  Button,
} from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function Passwords() {
  const { passwords, getData, loading } = usePasswordStore()
  const { token } = useAuthStore()
  const [showPassword, setShowPassword] = useState<PasswordData | null>()
  const [isSecret, setIsSecret] = useState<boolean>(true)

  useEffect(() => {
    getData('/server/api/passwords', token)
  }, [getData, token])

  const findPasswordByID = (id: string) => {
    setIsSecret(() => true)

    const password = passwords.find((el) => el.ID == id)

    if (password) {
      setShowPassword(() => password)
    }
  }

  const handleCopy = (password: string) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        toast.success('Password Copied')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <DesktopLayout>
      <Box p="6" maxWidth="400px" width="100%">
        {loading ? (
          <Spinner />
        ) : (
          <Box>
            <TextField.Root placeholder="Search the passwords…">
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>

            <Flex width="100%" justify="between" align="center" my="6">
              <Text>My password vault</Text>
              <Tooltip content="Add new password">
                <IconButton>
                  <PlusIcon />
                </IconButton>
              </Tooltip>
            </Flex>
            <ScrollArea
              type="auto"
              scrollbars="vertical"
              style={{ height: 'auto', maxHeight: '80vh' }}
            >
              <Flex direction="column" gap="4">
                {passwords ? (
                  passwords.map((password) => (
                    <Card key={password.ID}>
                      <Flex justify="between">
                        <Flex direction="column" align="start">
                          <Text
                            weight="bold"
                            size="3"
                            wrap="nowrap"
                            style={{
                              width: '270px',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                            }}
                            onClick={() => findPasswordByID(password.ID)}
                          >
                            {password.Name}
                          </Text>
                          <Text color="gray" size="2">
                            {password.Website}
                          </Text>
                          <Badge variant="surface" color="indigo">
                            {defaultDateFormat(password.CreatedAt)}
                          </Badge>
                        </Flex>
                        <StarIcon />
                      </Flex>
                    </Card>
                  ))
                ) : (
                  <Callout.Root variant="surface">
                    <Callout.Icon>
                      <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>Nothing to see here!</Callout.Text>
                  </Callout.Root>
                )}
              </Flex>
            </ScrollArea>
          </Box>
        )}
      </Box>
      <Box
        width="100%"
        height="100vh"
        p="6"
        style={{ background: 'var(--indigo-3)' }}
      >
        {showPassword ? (
          <Flex direction="column" gap="6">
            <Card variant="ghost">
              <Flex gap="2" justify="end">
                <Tooltip content="Favorite">
                  <IconButton variant="surface">
                    {showPassword?.Favorite ? <StarFilledIcon /> : <StarIcon />}
                  </IconButton>
                </Tooltip>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="solid" size="2">
                      Options
                      <DropdownMenu.TriggerIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content size="2" variant="soft">
                    <DropdownMenu.Item onClick={() => setShowPassword(null)}>
                      Quit <ResetIcon />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      Edit <Pencil1Icon />
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item color="red">
                      Delete <TrashIcon />
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Flex>
            </Card>
            <Card variant="classic">
              <DataList.Root size="3">
                <DataList.Item>
                  <DataList.Label>Name</DataList.Label>
                  <DataList.Value>{showPassword?.Name}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label>Created at</DataList.Label>
                  <DataList.Value>
                    {defaultDateFormat(showPassword?.CreatedAt || '')}
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label>Updated at</DataList.Label>
                  <DataList.Value>
                    {defaultDateFormat(showPassword?.UpdatedAt || '')}
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label>Username</DataList.Label>
                  <DataList.Value>{showPassword?.Username}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label>Password</DataList.Label>
                  <DataList.Value>
                    <Flex align="center" gap="2">
                      <Code variant="ghost" size="3">
                        {isSecret
                          ? showPassword?.Password.replace(/./g, '*')
                          : showPassword?.Password}
                      </Code>
                      <IconButton
                        size="1"
                        aria-label="copy value"
                        color="gray"
                        variant="ghost"
                        onClick={() => handleCopy(showPassword?.Password)}
                      >
                        <CopyIcon />
                      </IconButton>
                      <IconButton
                        size="1"
                        aria-label="see value"
                        color="gray"
                        variant="ghost"
                        onClick={() => setIsSecret((is) => !is)}
                      >
                        {isSecret ? <EyeOpenIcon /> : <EyeClosedIcon />}
                      </IconButton>
                    </Flex>
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label>Website</DataList.Label>
                  <DataList.Value>
                    <Link target="_blank" href={showPassword?.Website}>
                      {showPassword?.Website}
                    </Link>
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label>Note</DataList.Label>
                  <DataList.Value>
                    <Blockquote color="gray">{showPassword?.Note}</Blockquote>
                  </DataList.Value>
                </DataList.Item>
              </DataList.Root>
            </Card>
          </Flex>
        ) : (
          <Callout.Root variant="outline">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>Select a Password Card</Callout.Text>
          </Callout.Root>
        )}
      </Box>
      <Toaster position="bottom-right" />
    </DesktopLayout>
  )
}
