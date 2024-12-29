import { PropsWithChildren, useEffect } from 'react'
import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router'
import { jwtDecode } from 'jwt-decode'

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()
  const { isAuthenticated, token, logout } = useAuthStore((state) => state)

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token)
      //@ts-expect-error token exp date
      if (decodedToken.exp * 1000 < Date.now()) {
        alert('Session expired. Please log in again.')
        logout()
        navigate('/login')
      }
    } else if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, token, logout, navigate])

  return isAuthenticated ? children : null
}

export default ProtectedRoute
