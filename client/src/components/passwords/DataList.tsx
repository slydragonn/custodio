import { Card, DataList, Code, Flex, Link, Blockquote } from '@radix-ui/themes'
import { IconButton } from '@radix-ui/themes'
import { defaultDateFormat } from '@/utils/date-format'
import { CopyIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import toast from 'react-hot-toast'

interface Props {
  name?: string
  createdAt?: string | Date
  updatedAt?: string | Date
  username?: string
  password?: string
  website?: string
  note?: string
  isSecret: boolean
  setIsSecret: (state: (state: boolean) => boolean) => void
}

const PasswordDataList = ({
  name,
  createdAt,
  updatedAt,
  username,
  password,
  website,
  note,
  isSecret,
  setIsSecret,
}: Props) => {
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
    <Card variant="classic">
      <DataList.Root size="3">
        <DataList.Item>
          <DataList.Label>Name</DataList.Label>
          <DataList.Value>{name}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Created at</DataList.Label>
          <DataList.Value>{defaultDateFormat(createdAt || '')}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Updated at</DataList.Label>
          <DataList.Value>{defaultDateFormat(updatedAt || '')}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Username</DataList.Label>
          <DataList.Value>{username}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Password</DataList.Label>
          <DataList.Value>
            <Flex align="center" gap="2">
              <Code variant="ghost" size="3">
                {isSecret ? password?.replace(/./g, '*') : password}
              </Code>
              <IconButton
                size="1"
                aria-label="copy value"
                color="gray"
                variant="ghost"
                onClick={() => handleCopy(password || '')}
              >
                <CopyIcon />
              </IconButton>
              <IconButton
                size="1"
                aria-label="see value"
                color="gray"
                variant="ghost"
                onClick={() => setIsSecret((is: boolean) => !is)}
              >
                {isSecret ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </IconButton>
            </Flex>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Website</DataList.Label>
          <DataList.Value>
            <Link target="_blank" href={website}>
              {website}
            </Link>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Note</DataList.Label>
          <DataList.Value>
            <Blockquote color="gray">{note}</Blockquote>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Card>
  )
}

export default PasswordDataList
