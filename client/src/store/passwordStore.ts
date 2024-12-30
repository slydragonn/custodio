import { PasswordData } from '@/types/passwords'
import { Token } from '@/types/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PasswordStore {
  passwords: [] | PasswordData[]
  loading: boolean
  getData: (url: string, token: Token) => Promise<void>
}

const usePasswordStore = create<PasswordStore>()(
  persist(
    (set) => ({
      passwords: [],
      loading: false,

      //Fetch passwords from the server
      getData: async (url: string, token: Token) => {
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
    }),
    {
      name: 'password-storage',
      partialize: (state) => ({ passwords: state.passwords }),
    },
  ),
)

export default usePasswordStore
