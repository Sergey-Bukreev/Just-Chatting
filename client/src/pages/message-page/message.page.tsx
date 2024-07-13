import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { CiImageOn } from 'react-icons/ci'
import { FaVideo } from 'react-icons/fa'
import { GoPaperclip } from 'react-icons/go'
import { IoSend } from 'react-icons/io5'

import s from './message.page.module.scss'

import { FilePreview } from '../../components/file-preivew/file-preview'
import { MessageHeader } from '../../components/message-header/message-header'
import { Button } from '../../components/ui/button'
import { FileLoader } from '../../components/ui/file-loader/file-loader'
import { RootState } from '../../store/store'
import { useSocket } from '../../utils/socket-context'
import { uploadFile } from '../../utils/upload-file'

export type MessagePageData = {
  email: string
  name: string
  online: boolean
  profile_pic: string
}
export type MessageType = {
  imageUrl: null | string
  text: string
  videoUrl: null | string
}

export const MessagePage = () => {
  const params = useParams()
  const socket = useSocket()
  const user = useSelector((state: RootState) => state.user)
  const [data, setData] = useState<MessagePageData>({
    email: '',
    name: '',
    online: false,
    profile_pic: '',
  })
  const [messageData, setMessageData] = useState<MessageType>({
    imageUrl: null,
    text: '',
    videoUrl: null,
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]) // Состояние для хранения загруженных файлов
  const [uploadImageVideo, setUploadImageVideo] = useState<boolean>(false)

  useEffect(() => {
    console.log('params.userId:', params.userId)
    if (socket) {
      socket.emit('message page', params.userId)
      console.log('Emitting message-page with userId:', params.userId)

      socket.on('message user', data => {
        setData(data)
      })
    }
  }, [socket, params.userId, user])

  const handleClickUpload = () => {
    setUploadImageVideo(true)
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setUploadImageVideo(false)
  }

  const handleUploadVideo = async (e: ChangeEvent<HTMLInputElement>) => {
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
    setUploadImageVideo(false)
  }

  const handleRemoveFile = (fileToRemove: File) => {
    setUploadedFiles(prev => prev.filter(file => file !== fileToRemove))
  }

  return (
    <div className={s.root}>
      <MessageHeader name={data.name} online={data.online} profile_pic={data.profile_pic} />
      <div className={s.messagesBlock}> messages will go here...</div>
      <div className={s.sendMessageBlock}>
        <Button className={s.addButton} onClick={handleClickUpload} variant={'icon'}>
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
                <p>Upload Image</p>
              </FileLoader>
              {messageData.imageUrl && (
                <div className={s.preview}>
                  <img alt={'Uploaded'} className={s.imagePreview} src={messageData.imageUrl} />
                </div>
              )}
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
                <p>Upload Video</p>
              </FileLoader>
              {messageData.videoUrl && (
                <div className={s.preview}>
                  <video className={s.videoPreview} controls>
                    <source src={messageData.videoUrl} type={'video/mp4'} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </label>
          </div>
        )}

        {/* Отображение превью загруженных файлов */}

        {uploadedFiles.map((file, index) => (
          <FilePreview file={file} key={index} onRemove={handleRemoveFile} />
        ))}

        <div className={s.inputWrapper}>
          <textarea placeholder={'Message...'} />
        </div>

        <Button onClick={() => {}} variant={'icon'}>
          <IoSend size={20} />
        </Button>
      </div>
    </div>
  )
}
