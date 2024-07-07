import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from 'axios'

import s from './../form.module.scss'

import { Button } from '../../ui/button'
import { Input } from '../../ui/input/input'
import { Typography } from '../../ui/typography'

export const EmailForm = () => {
  const [data, setData] = useState({
    email: '',
  })
  const navigate = useNavigate()
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

    const URL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/email`

    try {
      const response = await axios.post(URL, data)

      toast.success(response.data.message)
      if (response.data.success) {
        setData({
          email: '',
        })
        navigate('/password', {
          state: response?.data?.data,
        })
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Typography className={s.title} variant={'h1'}>
        {'Just Write Your Email'}
      </Typography>
      <Input
        id={'email'}
        label={'Email'}
        name={'email'}
        onChange={handleOnChange}
        placeholder={'Enter your email'}
        required
        type={'text'}
        value={data.email}
      />
      <Button className={s.sendButton}>{'Check Email'}</Button>
      <div className={s.loginLink}>
        <Typography variant={'body2'}>{'New User ?'}</Typography>
        <Typography as={Link} to={'/register'} variant={'link1'}>
          {'Sign-Up'}
        </Typography>
      </div>
    </form>
  )
}
