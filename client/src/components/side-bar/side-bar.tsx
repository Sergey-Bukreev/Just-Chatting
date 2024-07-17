import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from './side-bar.module.scss'

import { RootState } from '../../store/store'
import { UserState, logout } from '../../store/userSlice'
import { useSocket } from '../../utils/socket-context'
import { Dialogs } from '../dialogs'
import { EditUserForm } from '../forms/edit-user-form/edit-user-form'
import { SearchFriends } from '../search-friends/search-friends'
import { SideMenu } from './side-menu'

export interface Message {
  _id: string
  createdAt: string
  imageUrl?: string
  msByUserId: string
  seen: boolean
  text: string
  updatedAt: string
  videoUrl?: string
}

interface ConversationUser {
  _id: string
  lastMessage: Message
  receiver: UserState
  sender: UserState
  unseenMessages: number
  userDetails: UserState
}

export const SideBar = () => {
  const user = useSelector((state: RootState) => state.user)

  const [isOpenEditUserDetails, setIsOpenEditUserDetails] = useState<boolean>(false)
  const [isOpenMessages, setIsOpenMessages] = useState<boolean>(true)
  const [isOpenAddFriends, setIsOpenAddFriends] = useState<boolean>(false)
  const [conversations, setConversations] = useState<ConversationUser[]>([])
  const socket = useSocket()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (socket) {
      socket.emit('sidebar', user._id)
      socket.on('conversation', (data: any) => {
        const conversationUserData = data.map((conversationUser: any) => {
          const userDetails =
            conversationUser.sender._id !== user._id
              ? conversationUser.sender
              : conversationUser.receiver

          return {
            ...conversationUser,
            userDetails,
          }
        })

        setConversations(conversationUserData)
      })
    }

    return () => {
      if (socket) {
        socket.off('conversation')
      }
    }
  }, [socket, user._id])

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
  const handleOnLogout = () => {
    dispatch(logout())
    navigate('/email')
    localStorage.clear()
  }

  return (
    <div className={s.root}>
      <SideMenu
        active={isOpenMessages}
        onLogout={handleOnLogout}
        onOpenAddFriendsClick={handleOpenAddFriends}
        onOpenEditClick={handleOpenEditUserDetails}
        onOpenMessagesClick={handleOpenMessages}
      />
      <div className={s.menu}>
        {isOpenEditUserDetails && <EditUserForm user={user} />}
        {isOpenMessages && <Dialogs conversations={conversations} />}
        {isOpenAddFriends && <SearchFriends />}
      </div>
    </div>
  )
}
