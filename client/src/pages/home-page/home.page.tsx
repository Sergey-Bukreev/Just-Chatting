import { useEffect } from 'react'
import { toast } from 'react-toastify'

import axios from 'axios'

import s from './home.page.module.scss'
export const HomePage = () => {
  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/user-details`
      const response = await axios({
        url: URL,
        withCredentials: true,
      })

      console.log('current user details', response)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  return <div className={s.root}>{'Home page'}</div>
}
