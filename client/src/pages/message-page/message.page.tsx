import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import s from './message.page.module.scss'

import { MessageForm } from '../../components/forms/message-form/message-form'
import { MessageHeader } from '../../components/message-header/message-header'
import { MessageItem } from '../../components/message-item/message-item'
import { RootState } from '../../store/store'
import { useSocket } from '../../utils/socket-context'
export type MessageType = {
  createdAt: string
  imageUrl: string
  msByUserId: string
  seen: boolean
  text: string
  videoUrl: string
}
export type MessagePageData = {
  email: string
  name: string
  online: boolean
  profile_pic: string
}

export const MessagePage = () => {
  const params = useParams()
  const socket = useSocket()
  const currenetMessage = useRef<HTMLDivElement | null>(null)
  const user = useSelector((state: RootState) => state.user)
  const [data, setData] = useState<MessagePageData>({
    email: '',
    name: '',
    online: false,
    profile_pic: '',
  })

  const [allMessages, setAllMessages] = useState([])

  useEffect(() => {
    console.log('params.userId:', params.userId)
    if (socket) {
      socket.emit('message page', params.userId)
      socket.emit('seen', params.userId)
      socket.on('message user', data => {
        setData(data)
      })
      socket.on('message', data => {
        setAllMessages(data)
        console.log('message', data)
      })
    }
  }, [socket, params.userId, user])
  useEffect(() => {
    if (currenetMessage) {
      currenetMessage.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [allMessages])

  return (
    <div className={s.root}>
      <MessageHeader name={data.name} online={data.online} profile_pic={data.profile_pic} />
      <div className={s.messagesBlock}>
        {allMessages.map((msg: MessageType, id) => {
          const isOwnMessage = msg.msByUserId === user._id
          const avatar = isOwnMessage ? user.profile_pic : data.profile_pic
          const name = isOwnMessage ? user.name : data.name

          return (
            <MessageItem
              avatar={avatar}
              imageUrl={msg.imageUrl}
              isOwnMessage={isOwnMessage}
              key={id}
              name={name}
              ref={currenetMessage}
              text={msg.text}
              time={new Date(msg.createdAt).toLocaleTimeString()}
              videoUrl={msg.videoUrl}
            />
          )
        })}
      </div>
      <MessageForm />
    </div>
  )
}
