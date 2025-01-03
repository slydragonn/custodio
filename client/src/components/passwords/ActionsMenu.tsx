import {
  Card,
  IconButton,
  DropdownMenu,
  Tooltip,
  Button,
  Flex,
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
}

const ActionsMenu = ({ showPassword, setShowPassword }: Props) => {
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
            <DropdownMenu.Item color="red">
              Delete <TrashIcon />
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </Card>
  )
}

export default ActionsMenu
