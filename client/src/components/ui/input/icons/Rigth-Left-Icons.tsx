import { FC } from 'react'

import { CloseIcon } from '@/components/ui/input/icons/iconsPack/close-outline'
import { EyeOffIcon } from '@/components/ui/input/icons/iconsPack/eye-off-outline'
import { EyeOnIcon } from '@/components/ui/input/icons/iconsPack/eye-on-outline'

type IconProps = {
  clear: (e: any) => void
  isTypePassword: boolean
  isTypeSearch: boolean
  isViewPassword: boolean
  switchView: () => void
  value: string | undefined
}
export const Icon: FC<IconProps> = ({
  clear,
  isTypePassword,
  isTypeSearch,
  isViewPassword,
  switchView,
  value,
}) => {
  if (isTypePassword) {
    return isViewPassword ? <EyeOnIcon onClick={switchView} /> : <EyeOffIcon onClick={switchView} />
  }

  if (isTypeSearch && value) {
    return <CloseIcon onClick={clear} />
  }

  return null
}
