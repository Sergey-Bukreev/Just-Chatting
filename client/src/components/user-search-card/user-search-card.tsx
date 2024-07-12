import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import s from './user-search-card.module.scss'

import { RootState } from '../../store/store'
import { UserState } from '../../store/userSlice'
import { Avatar } from '../ui/avatar/avataar'
import { Typography } from '../ui/typography'

export type UserSearchCardProps = {
  user: UserState
}
export const UserSearchCard = ({ user }: UserSearchCardProps) => {
  const onlineUsers = useSelector((state: RootState) => state.user.onlineUsers)
  const isOnline: boolean = onlineUsers?.includes(user._id)

  return (
    <Link className={s.root} to={'/home/:' + user._id}>
      <div className={s.user}>
        <Avatar initials={user.name} size={50} src={user.profile_pic} />
        <div className={s.userInfo}>
          <Typography variant={'body1'}>{user.name}</Typography>
          <Typography variant={'caption'}>{user.email}</Typography>
        </div>
        <div className={s.status}>
          <div className={isOnline ? s.online : ''}></div>
          <Typography variant={'caption'}>{isOnline && 'Online'}</Typography>
        </div>
      </div>
    </Link>
  )
}
