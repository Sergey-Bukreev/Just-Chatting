import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import s from './message.page.module.scss'

import { Page } from '../../components/ui/page'
import { useSocket } from '../../utils/socket-context.tsx'

export const MessagePage = () => {
  const params = useParams()
  const socket = useSocket()

  useEffect(() => {
    console.log('params.userId:', params.userId)
    if (socket) {
      socket.emit('message page', params.userId)
      console.log('Emitting message-page with userId:', params.userId)
    }
  }, [socket, params.userId])

  return <Page className={s.root}>{'Message Page'}</Page>
}
