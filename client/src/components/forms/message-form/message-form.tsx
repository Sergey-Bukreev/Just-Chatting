import React, { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { CiImageOn } from 'react-icons/ci'
import { FaVideo } from 'react-icons/fa'
import { GoPaperclip } from 'react-icons/go'
import { IoSend } from 'react-icons/io5'

import s from './message-form.module.scss'

import { RootState } from '../../../store/store'
import { useSocket } from '../../../utils/socket-context'
import { uploadFile } from '../../../utils/upload-file'
import { FilePreview } from '../../file-preivew/file-preview'
import { Button } from '../../ui/button'
import { FileLoader } from '../../ui/file-loader/file-loader'
import { Input } from '../../ui/input/input'
export type MessageType = {
  imageUrl: null | string
  text: string
  videoUrl: null | string
}
export const MessageForm = () => {
  const params = useParams()
  const socket = useSocket()
  const user = useSelector((state: RootState) => state.user)
  const [messageData, setMessageData] = useState<MessageType>({
    imageUrl: null,
    text: '',
    videoUrl: null,
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]) // Состояние для хранения загруженных файлов
  const [uploadImageVideo, setUploadImageVideo] = useState<boolean>(false)

  const handleClickUpload = () => {
    setUploadImageVideo(prev => !prev)
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadImageVideo(prev => !prev)
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    const uploadImage = await uploadFile(file)

    setMessageData(prev => ({
      ...prev,
      imageUrl: uploadImage.url,
    }))
    setUploadedFiles(prev => [...prev, file]) // Добавляем загруженный файл в состояние
  }

  const handleUploadVideo = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploadImageVideo(prev => !prev)
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    const uploadVideo = await uploadFile(file)

    setMessageData(prev => ({
      ...prev,
      videoUrl: uploadVideo.url,
    }))

    setUploadedFiles(prev => [...prev, file]) // Добавляем загруженный файл в состояние
  }

  const handleRemoveFile = (fileToRemove: File) => {
    setUploadedFiles(prev => prev.filter(file => file !== fileToRemove))
  }

  const handleOnChangeTextMessage = (e: any) => {
    const { value } = e.target

    setMessageData(prev => ({
      ...prev,
      text: value,
    }))
  }

  const handleSendMessage = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (messageData.text || messageData.videoUrl || messageData.imageUrl) {
      if (socket) {
        socket.emit('new message', {
          imageUrl: messageData.imageUrl,
          msByUserId: user._id,
          receiver: params.userId,
          sender: user._id,
          text: messageData.text,
          videoUrl: messageData.videoUrl,
        })
        setMessageData({
          imageUrl: null,
          text: '',
          videoUrl: null,
        })
        setUploadedFiles([]) // Очищаем загруженные файлы
      }
    }
  }

  return (
    <form className={s.sendMessageBlock} onSubmit={handleSendMessage}>
      <Button className={s.addButton} onClick={handleClickUpload} type={'button'} variant={'icon'}>
        <GoPaperclip className={s.icon} size={24} />
      </Button>

      {uploadImageVideo && (
        <div className={s.uploadDropDown}>
          <label className={s.uploadItem} htmlFor={'uploadImage'}>
            <FileLoader
              as={Button}
              className={s.fileLoader}
              onChange={handleUploadImage}
              type={'button'}
              variant={'icon'}
            >
              <CiImageOn size={18} />
              <p>{'Image'}</p>
            </FileLoader>
          </label>

          <label className={s.uploadItem} htmlFor={'uploadVideo'}>
            <FileLoader
              as={Button}
              className={s.fileLoader}
              onChange={handleUploadVideo}
              type={'button'}
              variant={'icon'}
            >
              <FaVideo size={18} />
              <p>{'Video'}</p>
            </FileLoader>
          </label>
        </div>
      )}

      {/* Отображение превью загруженных файлов */}
      {uploadedFiles.map((file, index) => (
        <FilePreview file={file} key={index} onRemove={handleRemoveFile} />
      ))}

      <div className={s.inputWrapper}>
        <Input
          onChange={handleOnChangeTextMessage}
          placeholder={'Message...'}
          value={messageData.text}
        />
      </div>

      <Button type={'submit'} variant={'icon'}>
        <IoSend size={20} />
      </Button>
    </form>
  )
}
