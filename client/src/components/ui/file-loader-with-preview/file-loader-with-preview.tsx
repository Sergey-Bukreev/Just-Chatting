import { ChangeEvent, useState } from 'react'

import s from './file-loader-with-preview.module.scss'

import { uploadFile } from '../../../utils/upload-file'
import { Button, ButtonProps } from '../button'
import { FileLoader } from '../file-loader/file-loader'

type PhotoUploaderProps = {
  onPhotoChange: (fileUrl: null | string) => void
  text?: string
} & Omit<ButtonProps, 'onChange' | 'onClick' | 'type'>

export const FileUploaderWithPreview = ({ onPhotoChange, text, ...rest }: PhotoUploaderProps) => {
  const [uploadPhoto, setUploadPhoto] = useState<null | string>(null)
  const [preview, setPreview] = useState<null | string>(null)

  const handleUploadPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files || files.length === 0) {
      return
    }

    const file = files[0]
    const uploadResult = await uploadFile(file)
    const PhotoUrl = uploadResult.url

    setUploadPhoto(PhotoUrl)
    onPhotoChange(PhotoUrl)

    setPreview(PhotoUrl)
  }

  const handleRemovePhoto = () => {
    setUploadPhoto(null)
    setPreview(null)
    onPhotoChange(null)
  }

  return (
    <>
      {uploadPhoto ? (
        <div className={s.previewContainer}>
          <div className={s.buttonWrapper}>
            <Button onClick={handleRemovePhoto} type={'button'} variant={'secondary'}>
              {'Remove photo'}
            </Button>
            <FileLoader
              as={Button}
              onChange={handleUploadPhoto}
              type={'button'}
              variant={'secondary'}
              {...rest}
            >
              {'Change photo'}
            </FileLoader>
          </div>
          <div className={s.previewImageBlock}>
            {preview && <img alt={'Preview'} className={s.previewImage} src={preview} />}
          </div>
        </div>
      ) : (
        <FileLoader
          as={Button}
          fullWidth
          onChange={handleUploadPhoto}
          type={'button'}
          variant={'secondary'}
          {...rest}
        >
          {text}
        </FileLoader>
      )}
    </>
  )
}
