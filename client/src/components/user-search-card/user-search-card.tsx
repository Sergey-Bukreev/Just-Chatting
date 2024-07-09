import { Link } from 'react-router-dom'

import s from './user-search-card.module.scss'

import { UserState } from '../../store/userSlice'
import { Avatar } from '../ui/avatar/avataar'
import { Typography } from '../ui/typography'
export type UserSearchCardProps = {
  user: UserState
}
export const UserSearchCard = ({ user }: UserSearchCardProps) => {
  return (
    <Link className={s.root} to={'/home/:' + user._id}>
      <div className={s.user}>
        <Avatar initials={user.name} size={50} src={user.profile_pic} />
        <div className={s.userInfo}>
          <Typography variant={'body1'}>{user.name}</Typography>
          <Typography variant={'caption'}>{user.email}</Typography>
        </div>
      </div>
    </Link>
  )
}
