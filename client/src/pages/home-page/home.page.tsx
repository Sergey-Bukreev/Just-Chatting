import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from 'axios'

import s from './home.page.module.scss'

import { SideBar } from '../../components/side-bar'
import { Page } from '../../components/ui/page'
import { RootState } from '../../store/store'
import { OnlineUsersType, logout, setOnlineUsers, setUser } from '../../store/userSlice'
import { useSocket } from '../../utils/socket-context'

export const HomePage = () => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const socket = useSocket()

  console.log('user', user)

  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/user-details`
      const response = await axios({
        url: URL,
        withCredentials: true,
      })

      dispatch(setUser(response.data.data))

      if (response.data.logout) {
        dispatch(logout())
        navigate('/email')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [navigate])

  useEffect(() => {
    if (socket) {
      socket.on('online users', (data: OnlineUsersType) => {
        console.log('Received online users', data)
        dispatch(setOnlineUsers(data))
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [socket, dispatch])

  const basePath = location.pathname === '/'

  return (
    <Page className={s.root}>
      <div className={s.sideBar}>
        <SideBar />
      </div>
      <div className={s.outlet}>{!basePath && <Outlet />}</div>
    </Page>
  )
}
