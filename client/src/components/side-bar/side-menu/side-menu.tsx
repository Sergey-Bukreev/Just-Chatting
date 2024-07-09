import { useSelector } from 'react-redux'

import clsx from 'clsx'
import { FaUserEdit } from 'react-icons/fa'
import { RiChat1Line, RiLogoutCircleLine, RiUserAddFill } from 'react-icons/ri'

import s from './side-menu.module.scss'

import { RootState } from '../../../store/store'
import { Avatar } from '../../ui/avatar/avataar'
import { Button } from '../../ui/button'

export type SideMenuProps = {
  active: boolean

  onOpenAddFriendsClick: () => void
  onOpenEditClick: () => void
  onOpenMessagesClick: () => void
}

export const SideMenu = ({
  active,

  onOpenAddFriendsClick,
  onOpenEditClick,
  onOpenMessagesClick,
}: SideMenuProps) => {
  const user = useSelector((state: RootState) => state.user)

  const handleMessageClick = () => {
    onOpenMessagesClick()
  }

  const handleEditClick = () => {
    onOpenEditClick()
  }
  const handleAddFriendClick = () => {
    onOpenAddFriendsClick()
  }

  return (
    <div className={s.sideMenu}>
      <div className={s.block}>
        <Avatar initials={user.name[0]} size={40} src={user.profile_pic} />
        <Button className={s.iconButton} onClick={handleEditClick} variant={'icon'}>
          <FaUserEdit className={s.icon} />
        </Button>

        <Button
          className={clsx(s.iconButton, { [s.active]: active })}
          onClick={handleMessageClick}
          variant={'icon'}
        >
          <RiChat1Line className={s.icon} />
        </Button>
        <Button className={s.iconButton} onClick={handleAddFriendClick} variant={'icon'}>
          <RiUserAddFill className={s.icon} />
        </Button>
      </div>
      <Button className={s.iconButton} variant={'icon'}>
        <RiLogoutCircleLine className={s.icon} />
      </Button>
    </div>
  )
}
