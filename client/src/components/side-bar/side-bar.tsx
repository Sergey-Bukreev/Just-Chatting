import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { FaUserEdit } from 'react-icons/fa'
import { RiChat1Line, RiLogoutCircleLine, RiUserAddFill } from 'react-icons/ri'

import s from './side-bar.module.scss'

import { RootState } from '../../store/store'
import { EditUserForm } from '../forms/edit-user-form/edit-user-form'
import { Avatar } from '../ui/avatar/avataar'
import { Button } from '../ui/button'

export const SideBar = () => {
  const user = useSelector((state: RootState) => state.user)
  const [isOpenEditUserDetails, setIsOpenEditUserDetails] = useState<boolean>(false)

  const handleOpenEditUserDetails = () => {
    setIsOpenEditUserDetails(true)
  }
  const handleCloseEditUserDetails = () => {
    setIsOpenEditUserDetails(false)
  }

  return (
    <div className={s.root}>
      <div className={s.sideMenu}>
        <div className={s.block}>
          <Avatar initials={user.name} size={40} src={user.profile_pic} />
          <Button className={s.iconButton} onClick={handleOpenEditUserDetails} variant={'icon'}>
            <FaUserEdit className={s.icon} />
          </Button>

          <Button
            as={Link}
            className={s.iconButton}
            onClick={handleCloseEditUserDetails}
            to={''}
            variant={'icon'}
          >
            <RiChat1Line className={s.icon} />
          </Button>
          <Button className={s.iconButton} onClick={handleCloseEditUserDetails} variant={'icon'}>
            <RiUserAddFill className={s.icon} />
          </Button>
        </div>
        <Button className={s.iconButton} variant={'icon'}>
          <RiLogoutCircleLine className={s.icon} />
        </Button>
      </div>
      <div className={s.menu}>
        {isOpenEditUserDetails && <EditUserForm onClose={handleCloseEditUserDetails} user={user} />}
      </div>
    </div>
  )
}
