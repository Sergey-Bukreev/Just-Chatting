export const cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME

if (!cloudName) {
  throw new Error('VITE_REACT_APP_CLOUDINARY_CLOUD_NAME is not defined')
}

const url: string = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`

export const uploadFile = async (file: File) => {
  const formData = new FormData()

  formData.append('file', file)
  formData.append('upload_preset', 'just-chatting-file')

  const response = await fetch(url, {
    body: formData,
    method: 'POST',
  })

  const responseData = await response.json()

  return responseData
}
