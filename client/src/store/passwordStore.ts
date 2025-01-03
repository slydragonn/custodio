import { PasswordData, PasswordForm } from '@/types/passwords'
import { Token } from '@/types/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PasswordStore {
  passwords: [] | PasswordData[]
  loading: boolean
  getPasswords: (url: string, token: Token) => Promise<void>
  addPassword: (
    password: PasswordForm,
    url: string,
    token: Token,
  ) => Promise<void>
}

const usePasswordStore = create<PasswordStore>()(
  persist(
    (set) => ({
      passwords: [],
      loading: false,

      //Fetch passwords from the server
      getPasswords: async (url: string, token: Token) => {
        set({ loading: true })
        try {
          const headers = new Headers()
          headers.append('Authorization', `Bearer ${token}`)
          const response = await fetch(url, { headers })

          if (response.status == 401) {
            throw new Error('Unauthorized')
          }

          const data: PasswordData[] = await response.json()
          set({ passwords: data, loading: false })
        } catch (error) {
          set({ loading: false })
          console.error(error)
        }
      },
      addPassword: async (
        password: PasswordForm,
        url: string,
        token: Token,
      ) => {
        set({ loading: true })
        try {
          const headers = new Headers()
          headers.append('Authorization', `Bearer ${token}`)
          const response = await fetch(url, {
            headers,
            method: 'POST',
            body: JSON.stringify(password),
          })

          if (response.status == 401) {
            throw new Error('Unauthorized')
          }

          const createdPassword = await response.json()
          console.log(createdPassword)

          set((state) => {
            if (!state.passwords) {
              return { passwords: [createdPassword.data] }
            }
            return {
              passwords: [...state.passwords, createdPassword.data],
            }
          })

          set({ loading: false })
        } catch (error) {
          set({ loading: false })
          console.error(error)
        }
      },
    }),
    {
      name: 'password-storage',
      partialize: (state) => ({ passwords: state.passwords }),
    },
  ),
)

export default usePasswordStore
