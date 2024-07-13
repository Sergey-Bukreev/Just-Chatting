import { FC } from 'react'

import { FaTrash } from 'react-icons/fa'

import s from './file-preview.module.scss'

type FilePreviewProps = {
  file: File
  onRemove: (file: File) => void
}

export const FilePreview: FC<FilePreviewProps> = ({ file, onRemove }: FilePreviewProps) => {
  const fileUrl = URL.createObjectURL(file)

  return (
    <div className={s.previewContainer}>
      {file.type.startsWith('image/') && (
        <img alt={file.name} className={s.previewImage} src={fileUrl} />
      )}
      {file.type.startsWith('video/') && (
        <video className={s.previewVideo} controls src={fileUrl} />
      )}
      <button className={s.removeButton} onClick={() => onRemove(file)} type={'button'}>
        <FaTrash />
      </button>
    </div>
  )
}
