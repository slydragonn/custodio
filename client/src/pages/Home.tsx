import { Button } from '@radix-ui/themes'
import useAuthStore from '../store/authStore'

export default function Home() {
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}
