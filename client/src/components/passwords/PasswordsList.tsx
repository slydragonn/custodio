import {
  MagnifyingGlassIcon,
  StarFilledIcon,
  StarIcon,
} from '@radix-ui/react-icons'
import {
  Badge,
  Box,
  Card,
  Flex,
  ScrollArea,
  Text,
  TextField,
} from '@radix-ui/themes'
import PasswordDialog from './PasswordDialog'
import { css } from '@emotion/css'
import { defaultDateFormat } from '@/utils/date-format'
import { PasswordData, PasswordForm } from '@/types/passwords'
import Callout from '@/components/ui/Callout'

interface Props {
  passwords: PasswordData[]
  add: (password: PasswordForm) => Promise<void>
  selectPasswordByID: (id: string) => void
}

const PasswordsList = ({ passwords, add, selectPasswordByID }: Props) => {
  return (
    <Box>
      <TextField.Root placeholder="Search the passwords…">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <Flex width="100%" justify="between" align="center" my="6">
        <Text>My password vault</Text>
        <PasswordDialog savePassword={add} />
      </Flex>
      <ScrollArea
        type="auto"
        scrollbars="vertical"
        style={{ height: 'auto', maxHeight: '68vh' }}
      >
        <Flex direction="column" gap="4">
          {passwords ? (
            passwords.map((password) => (
              <Card
                key={password.ID}
                onClick={() => selectPasswordByID(password.ID)}
                className={css`
                  user-select: none;
                  transition: all 0.2s;
                  &:hover {
                    background: var(--indigo-6);
                  }
                `}
              >
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
                    <Text
                      color="gray"
                      size="2"
                      wrap="nowrap"
                      style={{
                        width: '270px',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {password.Website}
                    </Text>
                    <Badge variant="surface" color="indigo">
                      {defaultDateFormat(password.CreatedAt)}
                    </Badge>
                  </Flex>
                  {password.Favorite ? (
                    <StarFilledIcon color="yellow" />
                  ) : (
                    <StarIcon color="gray" />
                  )}
                </Flex>
              </Card>
            ))
          ) : (
            <Callout>Nothing to see here!</Callout>
          )}
        </Flex>
      </ScrollArea>
    </Box>
  )
}

export default PasswordsList
