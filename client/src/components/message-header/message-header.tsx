import { Link } from 'react-router-dom'

import { IoIosClose } from 'react-icons/io'

import s from './message-header.module.scss'

import { Avatar } from '../ui/avatar/avataar'
import { Button } from '../ui/button'
import { Typography } from '../ui/typography'
export type MessageHeaderProps = {
  name: string
  online: boolean
  profile_pic: string
}
export const MessageHeader = ({ name, online, profile_pic }: MessageHeaderProps) => {
  return (
    <header className={s.header}>
      <div className={s.userInfo}>
        <Avatar initials={name} size={40} src={profile_pic} />
        <div className={s.name}>
          <Typography className={s.userName} variant={'h3'}>
            {name}
          </Typography>
          <Typography className={online ? s.online : s.offline} variant={'caption'}>
            {online ? 'Online' : 'Offline'}
          </Typography>
        </div>
      </div>

      <Button as={Link} className={s.closeButton} to={'/home'} variant={'icon'}>
        <IoIosClose size={24} />
      </Button>
    </header>
  )
}
