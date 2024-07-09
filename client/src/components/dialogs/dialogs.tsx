import s from './dialogs.module.scss'

import { Typography } from '../ui/typography'

export const Dialogs = () => {
  return (
    <div className={s.root}>
      <Typography variant={'h2'}>{'Chatting'}</Typography>
    </div>
  )
}
