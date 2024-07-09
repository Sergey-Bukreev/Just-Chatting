import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import axios from 'axios'
import { RiEditFill } from 'react-icons/ri'

import s from './edit-user-form.module.scss'

import { UserState, setUser } from '../../../store/userSlice'
import { uploadFile } from '../../../utils/upload-file'
import { Avatar } from '../../ui/avatar/avataar'
import { Button } from '../../ui/button'
import { FileLoader } from '../../ui/file-loader/file-loader'
import { Input } from '../../ui/input/input'
import { Typography } from '../../ui/typography'
export type EditUserFormProps = {
  user: UserState
}
export const EditUserForm = ({ user }: EditUserFormProps) => {
  const [data, setData] = useState({
    name: user.name,
    profile_pic: user.profile_pic,
  })
  const [editMode, setEditMode] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setData(prev => {
      return {
        ...prev,
        ...user,
      }
    })
  }, [user])
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setData(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  const handleUploadPhoto = async (e: any) => {
    const file = e.target.files[0]
    const uploadPhoto = await uploadFile(file)

    setData(prev => {
      return {
        ...prev,
        profile_pic: uploadPhoto.url,
      }
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const URL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/update-user`
      const response = await axios({
        data: data,
        method: 'POST',
        url: URL,
        withCredentials: true,
      })

      toast.success(response.data.message)
      if (response.data.success) {
        dispatch(setUser(response.data.data))
      }
      setEditMode(false)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Typography className={s.title} variant={'h2'}>
        {'Just Edit Profile'}
      </Typography>
      <div className={s.avatarWrapper}>
        <Avatar
          alt={'User Photo'}
          className={s.avatar}
          initials={data.name}
          size={120}
          src={data.profile_pic}
        />
        <FileLoader
          as={Button}
          className={s.fileLoader}
          name={'avtar'}
          onChange={handleUploadPhoto}
          type={'button'}
          variant={'icon'}
        >
          <RiEditFill className={s.icon} />
        </FileLoader>
      </div>
      {editMode && (
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
      )}
      {!editMode && (
        <div className={s.infoBlock}>
          <div className={s.nameBlock}>
            <Typography variant={'h1'}>{user.name}</Typography>
            <Button className={s.editButton} onClick={() => setEditMode(true)} variant={'icon'}>
              <RiEditFill size={18} />
            </Button>
          </div>
          <Typography variant={'subTitle1'}>{user.email}</Typography>
        </div>
      )}
      <Button className={s.sendButton}>{'Save'}</Button>
    </form>
  )
}
export default React.memo(EditUserForm)
