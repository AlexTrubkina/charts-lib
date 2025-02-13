import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './apps/website/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App/>
  </StrictMode>,
)
