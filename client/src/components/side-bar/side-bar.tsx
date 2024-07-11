import { useState } from 'react'
import { useSelector } from 'react-redux'

import s from './side-bar.module.scss'

import { RootState } from '../../store/store'
import { Dialogs } from '../dialogs'
import { EditUserForm } from '../forms/edit-user-form/edit-user-form'
import { SearchFriends } from '../search-friends/search-friends'
import { SideMenu } from './side-menu'

export const SideBar = () => {
  const user = useSelector((state: RootState) => state.user)

  const [isOpenEditUserDetails, setIsOpenEditUserDetails] = useState<boolean>(false)
  const [isOpenMessages, setIsOpenMessages] = useState<boolean>(true)
  const [isOpenAddFriends, setIsOpenAddFriends] = useState<boolean>(false)

  const handleOpenEditUserDetails = () => {
    setIsOpenAddFriends(false)
    setIsOpenMessages(false)
    setIsOpenEditUserDetails(true)
  }

  const handleOpenMessages = () => {
    setIsOpenAddFriends(false)
    setIsOpenEditUserDetails(false)
    setIsOpenMessages(true)
  }

  const handleOpenAddFriends = () => {
    setIsOpenMessages(false)
    setIsOpenEditUserDetails(false)
    setIsOpenAddFriends(true)
  }

  return (
    <div className={s.root}>
      <SideMenu
        active={isOpenMessages}
        onOpenAddFriendsClick={handleOpenAddFriends}
        onOpenEditClick={handleOpenEditUserDetails}
        onOpenMessagesClick={handleOpenMessages}
      />
      <div className={s.menu}>
        {isOpenEditUserDetails && <EditUserForm user={user} />}
        {isOpenMessages && <Dialogs />}
        {isOpenAddFriends && <SearchFriends />}
      </div>
    </div>
  )
}
