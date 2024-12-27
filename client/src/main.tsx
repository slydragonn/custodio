import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.tsx'
import Register from './pages/Register.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Theme>
  </StrictMode>,
)
