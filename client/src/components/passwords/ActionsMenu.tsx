import {
  Card,
  IconButton,
  DropdownMenu,
  Tooltip,
  Button,
  Flex,
  AlertDialog,
} from '@radix-ui/themes'
import {
  ResetIcon,
  Pencil1Icon,
  TrashIcon,
  StarIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons'
import { PasswordData } from '@/types/passwords'

interface Props {
  showPassword: PasswordData | null
  setShowPassword: (state: PasswordData | null) => void
  deletePassword: () => void
}

const ActionsMenu = ({
  showPassword,
  setShowPassword,
  deletePassword,
}: Props) => {
  return (
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
            <DropdownMenu.Item color="red" asChild>
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button variant="ghost" color="red">
                    Delete <TrashIcon />
                  </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                  <AlertDialog.Title>Delete Password</AlertDialog.Title>
                  <AlertDialog.Description size="4">
                    Are you sure this action cannot be undone?
                  </AlertDialog.Description>

                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">
                        Cancel
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Button
                        variant="solid"
                        color="red"
                        onClick={deletePassword}
                      >
                        Delete
                      </Button>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Card>
  )
}

export default ActionsMenu
