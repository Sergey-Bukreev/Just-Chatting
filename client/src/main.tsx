import { StrictMode } from 'react'
import { Provider } from 'react-redux'

import { createRoot } from 'react-dom/client'

import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import { App } from './App'
import { store } from './store/store'
import { SocketProvider } from './utils/socket-context'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider url={import.meta.env.VITE_REACT_BACKEND_URL}>
        <App />
      </SocketProvider>
    </Provider>
  </StrictMode>
)
