import { Button } from '@/components/ui/button'
import { FileLoader } from '@/components/ui/file-loader/file-loader'
import { Meta } from '@storybook/react'

const meta = {
  component: FileLoader,
  tags: ['autodocs'],
  title: 'Components/UI/FileUploader',
} satisfies Meta<typeof FileLoader>

export default meta

export const DefaultButtonFileLoaderExample = {
  render: () => {
    return (
      <FileLoader name={'file'} onChange={() => {}}>
        {'Choose a file'}
      </FileLoader>
    )
  },
}

export const FullWidthButtonFileLoaderExample = {
  render: () => {
    return (
      <FileLoader as={Button} fullWidth name={'file'} onChange={() => {}} variant={'secondary'}>
        {'Choose a file'}
      </FileLoader>
    )
  },
}
