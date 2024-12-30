import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.tsx'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from '@/pages/Home.tsx'
import Register from '@/pages/Register.tsx'
import Login from '@/pages/Login.tsx'
import ProtectedRoute from '@/layouts/ProtectedRoute.tsx'
import Passwords from '@/pages/Passwords'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/passwords"
              element={
                <ProtectedRoute>
                  <Passwords />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Theme>
  </StrictMode>,
)
