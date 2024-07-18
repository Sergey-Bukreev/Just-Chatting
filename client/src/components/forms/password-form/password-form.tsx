import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from 'axios'

import s from './../form.module.scss'

import { setToken } from '../../../store/userSlice'
import { useAuth } from '../../../utils/auth-context'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input/input'
import { Typography } from '../../ui/typography'

export const PasswordForm = () => {
  const [data, setData] = useState({
    password: '',
  })
  const { authIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const state = location.state

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setData(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/password`

    try {
      const response = await axios({
        data: {
          password: data.password,
          userId: state?._id,
        },
        method: 'POST',
        url: URL,
        withCredentials: true,
      })

      toast.success(response.data.message)
      if (response.data.success) {
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token', response.data.token)
        setData({ password: '' })
        authIn()
        navigate(`/home`)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Typography className={s.title} variant={'h1'}>
        {'Just Write Your Password'}
      </Typography>
      <div className={s.inputWrapper}>
        <Input
          id={'password'}
          label={'Password'}
          name={'password'}
          onChange={handleOnChange}
          placeholder={'Enter your password'}
          required
          type={'password'}
          value={data.password}
        />
      </div>
      <Button className={s.sendButton}>{'Login'}</Button>
      <div className={s.loginLink}>
        <Typography variant={'body2'}>{'Forgot password ?'}</Typography>
        <Typography as={Link} to={'/forgot-password'} variant={'link1'}>
          {'Remove'}
        </Typography>
      </div>
    </form>
  )
}
