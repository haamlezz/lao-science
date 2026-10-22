import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/noto-sans-lao/lao-400.css'
import '@fontsource/noto-sans-lao/lao-500.css'
import '@fontsource/noto-sans-lao/lao-700.css'
import '@fontsource/noto-sans-lao/latin-400.css'
import '@fontsource/noto-sans-lao/latin-500.css'
import '@fontsource/noto-sans-lao/latin-700.css'
import './styles.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
