import DesktopLayout from '@/layouts/Desktop'
import useAuthStore from '@/store/authStore'
import usePasswordStore from '@/store/passwordStore'
import { defaultDateFormat } from '@/utils/date-format'
import {
  InfoCircledIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  StarIcon,
} from '@radix-ui/react-icons'
import {
  Badge,
  Box,
  Callout,
  Card,
  Flex,
  IconButton,
  ScrollArea,
  Spinner,
  Text,
  TextField,
  Tooltip,
} from '@radix-ui/themes'
import { useEffect } from 'react'

export default function Passwords() {
  const { passwords, getData, loading } = usePasswordStore()
  const { token } = useAuthStore()

  useEffect(() => {
    getData('/server/api/passwords', token)
  }, [getData, token])

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
    </DesktopLayout>
  )
}
