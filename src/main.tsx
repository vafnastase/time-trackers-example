import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import RootApp from "./RootApp.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RootApp>
          <App />
      </RootApp>
  </StrictMode>,
)
