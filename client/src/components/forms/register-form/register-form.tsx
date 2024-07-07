import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from 'axios'

import s from './../form.module.scss'

import { Button } from '../../ui/button'
import { FileUploaderWithPreview } from '../../ui/file-loader-with-preview/file-loader-with-preview'
import { Input } from '../../ui/input/input'
import { Typography } from '../../ui/typography'

export const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
    profile_pic: '',
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

  const handlePhotoChange = (fileUrl: null | string) => {
    setData(prevState => ({
      ...prevState,
      profile_pic: fileUrl ? fileUrl : '',
    }))
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/register`

    try {
      const response = await axios.post(URL, data)

      console.log('response', response)

      toast.success(response.data.message)
      if (response.data.success) {
        setData({
          email: '',
          name: '',
          password: '',
          profile_pic: '',
        })
        navigate('/email')
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
    console.log('data', data)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Typography className={s.title} variant={'h1'}>
        {'Just Sign Up'}
      </Typography>
      <div className={s.inputWrapper}>
        <Input
          id={'name'}
          label={'Name'}
          name={'name'}
          onChange={handleOnChange}
          placeholder={'Enter your name'}
          required
          type={'text'}
          value={data.name}
        />
      </div>
      <div className={s.inputWrapper}>
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
      </div>
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
      <div className={s.inputWrapper}>
        <FileUploaderWithPreview onPhotoChange={handlePhotoChange} />
      </div>
      <Button className={s.sendButton}>{'Register'}</Button>
      <div className={s.loginLink}>
        <Typography variant={'body2'}>{'Already have account ?'}</Typography>
        <Typography as={Link} to={'/email'} variant={'link1'}>
          {'Sign-In'}
        </Typography>
      </div>
    </form>
  )
}
