import { jwtDecode } from 'jwt-decode'
import { create, StoreApi, UseBoundStore } from 'zustand'

interface AuthStore {
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const useAuthStore: UseBoundStore<StoreApi<AuthStore>> = create((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'), // JWT Token
  login: (token: string) => {
    const decodedToken = jwtDecode(token)
    //@ts-expect-error token exp date
    const isExpired = decodedToken.exp * 1000 < Date.now()

    if (isExpired) {
      set({ isAuthenticated: false, token: null })
      localStorage.removeItem('token')
    } else {
      set({ isAuthenticated: true, token })
      localStorage.setItem('token', token)
    }
  },
  logout: () => {
    set({ isAuthenticated: false, token: null })
    localStorage.removeItem('token')
  },
}))

export default useAuthStore
