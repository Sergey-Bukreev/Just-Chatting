import { StrictMode } from 'react'
import { Provider } from 'react-redux'

import { createRoot } from 'react-dom/client'

import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import { Router } from './routes'
import { store } from './store/store'
import { AuthProvider } from './utils/auth-context'
import { SocketProvider } from './utils/socket-context'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider url={import.meta.env.VITE_REACT_BACKEND_URL}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </SocketProvider>
    </Provider>
  </StrictMode>
)
