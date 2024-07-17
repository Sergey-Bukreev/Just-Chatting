import { FC } from 'react'
import { Link } from 'react-router-dom'

import { CiImageOn } from 'react-icons/ci'
import { FaVideo } from 'react-icons/fa'

import s from './dialogs.module.scss'

import { UserState } from '../../store/userSlice'
import { Message } from '../side-bar'
import { Avatar } from '../ui/avatar/avataar'
import { Typography } from '../ui/typography'

interface ConversationUser {
  _id: string
  lastMessage: Message
  receiver: UserState
  sender: UserState
  unseenMessages: number
  userDetails: UserState
}

interface DialogsProps {
  conversations: ConversationUser[]
}
export const Dialogs: FC<DialogsProps> = ({ conversations }) => {
  return (
    <div className={s.root}>
      <h2 className={s.title}>Just Chatting</h2>
      {conversations.map((conv: ConversationUser) => (
        <Link className={s.conversation} key={conv._id} to={`/home/${conv.userDetails._id}`}>
          <Avatar initials={conv.userDetails.name} size={50} src={conv.userDetails.profile_pic} />
          <div className={s.messageBlock}>
            <div className={s.nameDate}>
              <Typography className={s.name} variant={'subTitle1'}>
                {conv.userDetails.name}
              </Typography>
              <Typography className={s.messageDate} variant={'caption'}>
                {conv?.lastMessage?.text ||
                conv?.lastMessage?.imageUrl ||
                conv?.lastMessage?.videoUrl
                  ? new Date(conv?.lastMessage?.createdAt).toLocaleTimeString()
                  : ''}
              </Typography>
            </div>

            <div className={s.message}>
              {conv?.lastMessage?.imageUrl && <CiImageOn size={20} />}
              {conv?.lastMessage?.videoUrl && <FaVideo size={20} />}
              <Typography className={s.messageText} variant={'body1'}>
                {conv.lastMessage?.text}
              </Typography>
              {conv.unseenMessages !== 0 && (
                <Typography className={s.messageUnseen} variant={'body1'}>
                  {conv.unseenMessages}
                </Typography>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
