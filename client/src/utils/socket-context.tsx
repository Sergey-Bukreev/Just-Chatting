import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { Socket, io } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextType>({ socket: null })

export const SocketProvider: React.FC<{ children: ReactNode; url: string }> = ({
  children,
  url,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    // Create socket instance with token authentication
    const newSocket = io(url, {
      auth: {
        token: localStorage.getItem('token'),
      },
    })

    // Set the socket instance
    setSocket(newSocket)

    // Disconnect socket on unmount
    return () => {
      newSocket.disconnect()
    }
  }, [url]) // Only reconnect if URL changes

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}

export const useSocket = () => {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }

  return context.socket
}
