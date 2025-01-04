import ActionsMenu from '@/components/passwords/ActionsMenu'
import PasswordDataList from '@/components/passwords/DataList'
import PasswordsList from '@/components/passwords/PasswordsList'
import Callout from '@/components/ui/Callout'
import DesktopLayout from '@/layouts/Desktop'
import useAuthStore from '@/store/authStore'
import usePasswordStore from '@/store/passwordStore'
import { PasswordData } from '@/types/passwords'
import { Box, Flex, Spinner } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Passwords() {
  const { passwords, getPasswords, loading, addPassword, deletePassword } =
    usePasswordStore()
  const { token } = useAuthStore()
  const [showPassword, setShowPassword] = useState<PasswordData | null>()
  const [isSecret, setIsSecret] = useState<boolean>(true)

  useEffect(() => {
    getPasswords('/server/api/passwords', token)
  }, [getPasswords, token])

  const selectPasswordByID = (id: string) => {
    setIsSecret(() => true)

    const password = passwords.find((el) => el.ID == id)

    if (password) {
      setShowPassword(() => password)
    }
  }

  const deletePasswordByID = (id: string) => {
    deletePassword(id, '/server/api/passwords/', token)
    setShowPassword(null)
  }

  return (
    <DesktopLayout>
      <Box
        p="6"
        maxWidth="400px"
        width="100%"
        height="100vh"
        style={{ background: 'var(--gray-2)' }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <PasswordsList
            passwords={passwords}
            add={(newPassword) =>
              addPassword(newPassword, '/server/api/passwords', token)
            }
            selectPasswordByID={selectPasswordByID}
          />
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
            <ActionsMenu
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              deletePassword={() => deletePasswordByID(showPassword.ID)}
            />
            <PasswordDataList
              name={showPassword.Name}
              createdAt={showPassword.CreatedAt}
              updatedAt={showPassword.UpdatedAt}
              username={showPassword.Username}
              password={showPassword.Password}
              website={showPassword.Website}
              note={showPassword.Note}
              isSecret={isSecret}
              setIsSecret={setIsSecret}
            />
          </Flex>
        ) : (
          <Callout>Select a Password Card</Callout>
        )}
      </Box>
      <Toaster position="bottom-right" />
    </DesktopLayout>
  )
}
