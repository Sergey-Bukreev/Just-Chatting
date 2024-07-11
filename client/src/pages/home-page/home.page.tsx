import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from 'axios'
import { io } from 'socket.io-client'

import s from './home.page.module.scss'

import { SideBar } from '../../components/side-bar'
import { Page } from '../../components/ui/page'
import { RootState } from '../../store/store'
import {
  OnlineUsersType,
  logout,
  setOnlineUsers,
  setSocketConnection,
  setUser,
} from '../../store/userSlice'
export const HomePage = () => {
  const user = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

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
  }, [])
  const basePath = location.pathname === '/'

  /// socket connection
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL
    const socketConnection = io(backendUrl, {
      auth: {
        token: localStorage.getItem('token'),
      },
    })

    socketConnection.on('online users', (data: OnlineUsersType) => {
      console.log('online users', data)
      dispatch(setOnlineUsers(data))
    })
    dispatch(setSocketConnection({ socketConnection }))
    console.log('socket connection initialized')

    return () => {
      socketConnection.disconnect()
    }
  }, [])

  return (
    <Page className={s.root}>
      <div className={s.sideBar}>
        <SideBar />
      </div>
      <div className={s.outlet}>{!basePath && <Outlet />}</div>
    </Page>
  )
}
