import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from 'axios'

import s from './home.page.module.scss'

import { SideBar } from '../../components/side-bar'
import { Page } from '../../components/ui/page'
import { RootState } from '../../store/store'
import { logout, setUser } from '../../store/userSlice'
import { MessagePage } from '../message-page'
export const HomePage = () => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  return (
    <Page className={s.root}>
      <SideBar />
      <MessagePage />
    </Page>
  )
}
