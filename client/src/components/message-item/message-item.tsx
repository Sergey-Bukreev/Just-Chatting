import { forwardRef } from 'react'

import clsx from 'clsx'

import s from './message-item.module.scss'

import { Avatar } from '../ui/avatar/avataar'
import { Typography } from '../ui/typography'

export type MessageItemProps = {
  avatar: string
  imageUrl?: string
  isOwnMessage: boolean
  name: string
  text: string
  time: string
  videoUrl?: string
}

export const MessageItem = forwardRef<HTMLDivElement, MessageItemProps>(
  ({ avatar, imageUrl, isOwnMessage, name, text, time, videoUrl }, ref) => {
    return (
      <div className={clsx(s.messageItem, { [s.ownMessage]: isOwnMessage })} ref={ref}>
        <Avatar alt={'avatar'} className={s.avatar} initials={name} size={50} src={avatar} />
        <div className={s.messageContainer}>
          {imageUrl && (
            <img alt={'image'} className={clsx({ [s.ownMessage]: isOwnMessage })} src={imageUrl} />
          )}
          {videoUrl && (
            <video className={clsx({ [s.ownMessage]: isOwnMessage })} controls src={videoUrl} />
          )}
          <Typography className={s.messageText} variant={'body1'}>
            {text}
          </Typography>
          <Typography
            className={clsx(s.messageTime, { [s.ownMessage]: isOwnMessage })}
            variant={'caption'}
          >
            {time}
          </Typography>
        </div>
      </div>
    )
  }
)
